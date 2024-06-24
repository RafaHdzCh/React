import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCabin as DeleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin()
{
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: DeleteCabin } = useMutation(
  {
    mutationFn: DeleteCabinAPI,
    onSuccess: () => 
    {
      toast.success("Cabin successfully deleted!");
      queryClient.invalidateQueries(
      {
        queryKey: ["cabin"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isDeleting, DeleteCabin};
}