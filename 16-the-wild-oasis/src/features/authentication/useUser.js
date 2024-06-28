import { useQuery } from "@tanstack/react-query";
import { GetCurrentUser } from "../../services/apiAuth";

export function useUser()
{
  const {isLoading, data: user, error, isFetching} = useQuery(
  {
    queryKey: ["user"], 
    queryFn: GetCurrentUser
  });

  const isAuthenticated = user?.role === 'authenticated';
 
  return { isLoading, user, error, isAuthenticated, isFetching };
}