import { updateSetting as UpdateSettingAPI } from "../../services/apiSettings";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSetting() 
{
  const queryClient = useQueryClient();

  const { mutate: UpdateSetting, isLoading: isUpdating } = useMutation(
    {
      mutationFn: UpdateSettingAPI,
      onSuccess: () => 
      {
        toast.success("Done!");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (error) => toast.error(error.message),
    }
  );

  return { isLoading: isUpdating, UpdateSetting };
}
