import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import { CreateEditCabin } from "../../services/apiCabins";

import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateCabinForm({ cabinToEdit = {} }) 
{
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm(
  {
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newCabinData, id }) => CreateEditCabin(newCabinData, id),
    onSuccess: () => 
    {
      toast.success(isEditSession ? "Cabin updated" : "New cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function OnSubmit(data) 
  {
    let newCabinData = { ...data };
    if (data.image && data.image.length > 0) 
    {
      newCabinData.image = data.image[0];
    } 
    else 
    {
      delete newCabinData.image;
    }
    if (isEditSession) mutate({ newCabinData, id: editId });
    else mutate({ newCabinData });
  }

  function OnError(errors) 
  {
    //console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(OnSubmit, OnError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input 
            type="text" 
            id="name" 
            {
              ...register("name", 
              {
                required: "This field is required"
              })
            }
          />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
      <Input 
        type="number" 
        id="maxCapacity" 
        {
          ...register("maxCapacity", 
          {
            required: "This field is required",
            min:
            {
              value: 1,
              message: "Capacity should be at least 1"
            }
          })
        }
      />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input 
          type="number" 
          id="regularPrice" 
          {
            ...register("regularPrice", 
            {
              required: "This field is required",
              min:
              {
                value: 1,
                message: "Capacity should be at least 1"
              }
            })
          }
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input 
          type="number" 
          id="discount" 
          defaultValue={0} 
          {
            ...register("discount", 
            {
              required: "This field is required",
              validate: (value) => value < getValues().regularPrice || "Discount must be less than regular price"
            })
          }
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea 
          type="number" 
          id="description" 
          defaultValue="" 
          {...register("description", 
            {
              required: "This field is required"
            })
          }
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput 
          id="image"
          accept="image/*"
          type="file"
          {
            ...register("image", 
            {
              required: isEditSession ? false : "This field is required"
            })
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>{isEditSession ? "Edit" : "Create"}</Button>
      </FormRow>

    </Form>
  );
}