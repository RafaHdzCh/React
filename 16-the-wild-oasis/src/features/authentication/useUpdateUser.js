import { UpdateCurrentUser } from "../../services/apiAuth";

import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() 
{
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation(
  {
    mutationFn: UpdateCurrentUser,
    onSuccess: ({user}) => 
    {
      toast.success("User successfully edited");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
