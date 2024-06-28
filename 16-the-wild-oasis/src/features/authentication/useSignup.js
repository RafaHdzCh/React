import { useMutation } from "@tanstack/react-query";
import { SignUp as SignUpAPI} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup()
{
  const {mutate: Signup, isLoading} = useMutation(
  {
    mutationFn: SignUpAPI,
    onSuccess: (data) =>
    {
      toast.success("Account created!");
    },
    onError: (error) =>
    {
      console.log(error);
      toast.error("Couldn't create account");
    }
  })

  return {Signup, isLoading};
}