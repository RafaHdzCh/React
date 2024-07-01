import { UpdateCurrentUser } from "../../services/apiAuth";

import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() 
{
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation(
  {
    mutationFn: UpdateCurrentUser,
    onSuccess: () => 
    {
      toast.success("User successfully edited");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
