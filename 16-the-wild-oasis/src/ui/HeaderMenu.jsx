import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";

import styled from "styled-components";
import * as ColorIcons from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";


const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

export default function HeaderMenu()
{
  const navigate = useNavigate();

  return (
  <StyledHeaderMenu>
    <li>
      <ButtonIcon onClick={() => navigate("/account")}>
        <ColorIcons.FcReadingEbook />
      </ButtonIcon>
    </li>
    <li>
      <DarkModeToggle />
    </li>
    <li>
      <Logout />
    </li>
  </StyledHeaderMenu>
  );
}