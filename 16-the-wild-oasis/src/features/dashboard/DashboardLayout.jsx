import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";

import styled from "styled-components";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout()
{
  const {bookings, isLoading: isLoadingBookings} = useRecentBookings();
  const {stays, confirmedStays, isLoading: isLoadingStays, numDays} = useRecentStays();
  const {cabins, isLoading: isLoadingCabins} =  useCabins();

  if(isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return(
    <StyledDashboardLayout>
      <Stats 
        bookings={bookings} 
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Todays activity</div>
      <div>Chart stay</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}