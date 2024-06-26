import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const SytledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
`

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

export default function AppLayout()
{
  return(
    <SytledAppLayout>
      <Header />
      <SideBar />
      
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </SytledAppLayout>
  )
}