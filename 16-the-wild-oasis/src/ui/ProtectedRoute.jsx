import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser"

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function ProtectedRoute({children})
{
  //1 Load the authenticated user
  const { isLoading, isAuthenticated, isFetching } = useUser();
  const navigate = useNavigate();


  //2 If no user, redirect to login
  useEffect(() => 
  {
    if (!isAuthenticated && !isLoading && !isFetching) navigate('/login');
  }, [isAuthenticated, isLoading, navigate, isFetching]);

  //3 While loading, show a spinner
  if(isLoading) return <FullPage><Spinner/></FullPage>;

  //4 If user, render app
  if(isAuthenticated) return children;
}