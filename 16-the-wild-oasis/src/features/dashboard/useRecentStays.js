import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentStays()
{
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const currentDate = new Date();
  const queryDate = subDays(currentDate, numDays).toISOString();

  const {isLoading, data: stays} = useQuery(
    {
      queryFn: () => getBookingsAfterDate(queryDate),
      queryKey:["stays", `last-${numDays}`]
    }
  );

  const confirmedStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out")

  return {isLoading, stays, confirmedStays};
}