import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(newCabin, id) 
{
  let imagePath = newCabin.image;

  // Verificar si la imagen es un archivo y manejarla
  if (newCabin.image && newCabin.image instanceof File) {
    const imageName = `${Math.random() * 10}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  } else if (!newCabin.image && id) {
    // Obtener la imagen actual si no se proporciona una nueva
    const { data: existingCabin, error: fetchError } = await supabase
      .from("cabins")
      .select("image")
      .eq("id", id)
      .single();
    
    if (fetchError) 
      {
      console.error(fetchError);
      throw new Error("Error fetching existing cabin data");
    }

    imagePath = existingCabin.image;
  }

  // Crear o actualizar la cabaña
  let query = supabase.from("cabins");
  if (!id) 
  {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } 
  else 
  {
    const updatedCabin = { ...newCabin, image: imagePath };
    query = query.update(updatedCabin).eq("id", id).select();
  }

  const { data, error } = await query.single();

  if (error) 
  {
    console.error(error);
    throw new Error("Cabins could not be created or updated");
  }

  return data;
}



export async function getCabins() 
{
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) 
  {
    console.error(error)
    throw new Error("Cabins could not be loaded")
  }

  return data;
}

export async function deleteCabin(id) 
{
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq("id", id)

  if (error) 
    {
    console.error(error)
    throw new Error("Cabin could not be deleted")
  }

  return data;
}