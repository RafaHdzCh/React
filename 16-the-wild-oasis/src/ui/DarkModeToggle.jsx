import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import * as ColorIcons from "react-icons/fc";

export default function DarkModeToggle()
{
  const {isDarkMode, ToggleDarkMode} = useDarkMode();

  return(
    <ButtonIcon onClick={ToggleDarkMode}>
      {isDarkMode ? <ColorIcons.FcFlashOn /> : <ColorIcons.FcFlashOff />}
    </ButtonIcon>
  );
}