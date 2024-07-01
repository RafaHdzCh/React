import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout()
{
  const {bookings, isLoading: isLoadingBookings} = useRecentBookings();
  const {stays, confirmedStays, isLoading: isLoadingStays} = useRecentStays();

  if(isLoadingBookings || isLoadingStays) return <Spinner />

  return(
    <StyledDashboardLayout>
      <div>Stats</div>
      <div>Todays activity</div>
      <div>Chart stay</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}