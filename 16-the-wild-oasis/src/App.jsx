import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Button from "./ui/Button";
import StyledApp from "./ui/StyledApp";
import GlobalStyles from "./styles/GlobalStyles"

export default function App() 
{
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1"> The Wild Oasis </Heading>
        <Button>Check in</Button>
        <Button>Check out</Button>

        <Heading as="h2"> Inputs </Heading>
        <Input type="number" placeholder="number of guests" />
      
        <Heading as="h3"> Page </Heading>
      </StyledApp>
    </>
  )
}