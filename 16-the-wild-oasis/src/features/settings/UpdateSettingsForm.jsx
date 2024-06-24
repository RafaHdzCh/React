import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSettings';

function UpdateSettingsForm() 
{
  const {
    isLoading, 
    settings: 
    {
      minBookingLength, 
      maxBookingLength, 
      maxGuestsPerBooking, 
      breakfastPrice
    } = {},
  } = useSettings();

  const {isUpdating, UpdateSetting} = useUpdateSetting();

  if(isLoading) return <Spinner />

  function HandleUpdate(event) 
  {
    const { value, id, defaultValue } = event.target;
    console.log(value);
 
    if (!value || !id || defaultValue === value) return;

    UpdateSetting({ [id]: value })
    event.target.defaultValue = value;
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input 
          type='number' 
          id='minBookingLength' 
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(event) => HandleUpdate(event)}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input 
          type='number' 
          id='maxBookingLength'
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(event) => HandleUpdate(event)}
         />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input 
          type='number' 
          id='maxGuestsPerBooking' 
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(event) => HandleUpdate(event)}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input 
          type='number' 
          id='breakfastPrice'
          disabled={isUpdating} 
          defaultValue={breakfastPrice}
          onBlur={(event) => HandleUpdate(event)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
