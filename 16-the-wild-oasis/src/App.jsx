import styled from "styled-components"

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  margin: 20px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
  background-color: purple;
`

const Input = styled.input`
  border: 1px solid;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`

export default function App() 
{
  return (
    <StyledApp>
      <H1> The Wild Oasis </H1>
      <Button>Check in</Button>
      <Button>Check out</Button>
      <Input type="number" placeholder="number of guests" />
    </StyledApp>
  )
}