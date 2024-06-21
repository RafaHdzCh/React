import supabase, { supabaseUrl } from "./supabase";

export async function CreateCabin(newCabin)
{
  const imageName = `${Math.random()*10}-${newCabin.image.name}`.replaceAll("/","");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1) Create cabin
  const { data, error } = await supabase
  .from('cabins')
  .insert([{...newCabin, image: imagePath}])
  .select();

  if(error)
  {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //2) Upload image
  const { error: storageError } = await supabase.storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)

  //3) Delete row if there is an error uploading the file
  if(storageError)
  {
    await supabase
    .from('cabins')
    .delete()
    .eq("id", data.id)

    console.error(error);
    throw new Error("Cabin image could not be uploaded");
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