import supabase from "./supabase";

export async function Login({email, password})
{
  let { data, error } = await supabase.auth.signInWithPassword(
  {
    email, password,
  });

  if(error) throw new Error(error.message);

  //console.log(data);
  return data;
}

export async function GetCurrentUser()
{
  const {data: session, error: sessionError} =  await supabase.auth.getSession();
  if (sessionError) throw new Error('Login error', { cause: sessionError });
  if(!session.session) return null;

  const { data: user, error: userError } = await supabase.auth.getUser();
 
  if (userError) throw new Error('Login error', { cause: userError });
 
  return user?.user;
}