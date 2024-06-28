import { Login as LoginAPI} from "../../services/apiAuth";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export function useLogin()
{
  const navigate = useNavigate();

  const {mutate: Login, isLoading} = useMutation(
  {
    mutationFn: ({email,password}) => LoginAPI({email,password}),
    onSuccess: () => 
    {
      toast.success("Successfully logged in!");
      navigate("/");
    },
    onError: () =>
    {
      toast.error("Invalid login credentials",);
    }
  });

  return {Login, isLoading};
}