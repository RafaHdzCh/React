import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding.js";

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

export const fetchAddress = createAsyncThunk("user/fetchAddress", async function() {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UpdateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => 
  {
    builder
      .addCase(fetchAddress.pending, 
      (state) => 
      {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, 
      (state, action) => 
      {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, 
      (state, action) => 
      {
        state.status = "error";
        state.error = "There was a problem getting your address!";
      });
  },
});

export const { UpdateName } = userSlice.actions;
export default userSlice.reducer;

export const GetUser = (state) => state.user.username;

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}