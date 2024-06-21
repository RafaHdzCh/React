import styled from "styled-components";
import {useForm} from "react-hook-form"
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

export default function CreateCabinForm() 
{
  const queryClient = useQueryClient(); 
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const { errors } = formState;
  const {mutate, isLoading} = useMutation(
  {
    mutationFn: CreateCabin,
    onSuccess: () =>
    {
      toast.success("New cabin created");
      queryClient.invalidateQueries({queryKey:["cabin"]});
      reset();
    },
    onError: (error) => toast.error(error.message)
  });

  function OnSubmit(data)
  {
    mutate({...data, image: data.image[0]})
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
              required: "This field is required"
            })
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>

    </Form>
  );
}