import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin()
{
  const queryClient = useQueryClient();

  const { mutate: CreateOrEditCabin, isLoading } = useMutation(
  {
    mutationFn: ({ newCabinData, id }) => CreateEditCabin(newCabinData, id),
    onSuccess: () => 
    {
      toast.success("Success");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isLoading, CreateOrEditCabin}
}
