import ButtonIcon from "../../ui/ButtonIcon";
import { FcImport } from "react-icons/fc";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout()
{
  const {logout, isLoading} = useLogout();


  return (
  <ButtonIcon disabled={isLoading} onClick={logout}>
    {!isLoading ? <FcImport /> : <SpinnerMini />}
  </ButtonIcon>)
}