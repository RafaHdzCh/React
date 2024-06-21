import supabase from "./supabase";

export async function CreateCabin(newCabin)
{
  const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin])
  .select();

  if(error)
    {
      console.error(error);
      throw new Error("Cabins could not be created");
    }
    
    return data;
}

export async function GetCabins()
{
  let { data, error } = await supabase.from('cabins').select('*');
  
  if(error)
  {
    console.error(error)
    throw new Error("Cabins could not be loaded")
  }
  
  return data;
}

export async function DeleteCabin(id)
{
  const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq("id", id)

  if(error)
  {
    console.error(error)
    throw new Error("Cabin could not be deleted")
  }
  
    return data;
}