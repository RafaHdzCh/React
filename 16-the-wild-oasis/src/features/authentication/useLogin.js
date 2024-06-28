import { Login as LoginAPI} from "../../services/apiAuth";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin()
{
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: Login, isLoading} = useMutation(
  {
    mutationFn: ({email,password}) => LoginAPI({email,password}),
    onSuccess: (user) => 
    {
      queryClient.setQueriesData(["user"], user);
      toast.success("Successfully logged in!");
      navigate("/",{replace: true});
    },
    onError: (error) =>
    {
      toast.error(`Invalid credentials`);
    }
  });

  return {Login, isLoading};
}