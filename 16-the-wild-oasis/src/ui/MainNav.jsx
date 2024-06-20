import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as ColorIcons from "react-icons/fc";
//https://react-icons.github.io/react-icons/icons/fc/

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav()
{
  return (
  <nav>
    <NavList>

      <li>
        <StyledNavLink to="/dashboard">
        <ColorIcons.FcHome  />
          <span>Home</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/bookings">
        <ColorIcons.FcCalendar  />
          <span>Booking</span>
        </StyledNavLink>
      </li>
      
      <li>
        <StyledNavLink to="/cabins">
        <ColorIcons.FcFilingCabinet  />
          <span>Cabins</span>
        </StyledNavLink>
      </li>
      
      <li>
        <StyledNavLink to="/users">
        <ColorIcons.FcConferenceCall   />
          <span>Users</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/settings">
        <ColorIcons.FcSettings   />
          <span>Settings</span>
        </StyledNavLink>
      </li>

    </NavList>
  </nav>
  )
}