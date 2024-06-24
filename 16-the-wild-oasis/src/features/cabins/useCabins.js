import { useQuery } from "@tanstack/react-query";
import { GetCabins } from "../../services/apiCabins";

export function useCabins()
{
  const {isLoading, data: cabins, error} = useQuery(
  {
    queryKey: ["cabin"],
    queryFn: GetCabins,
  })

  return {isLoading, error, cabins};
}