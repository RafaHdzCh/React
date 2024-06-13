import { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch();

  function HandleClick() 
  {
    if(!fullName || !nationalId) return;
    dispatch(CreateCustomer(fullName, nationalId))
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={HandleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
