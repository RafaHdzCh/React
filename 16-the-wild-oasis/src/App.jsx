import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Row from "./ui/Row";
import Button from "./ui/Button";
import StyledApp from "./ui/StyledApp";
import GlobalStyles from "./styles/GlobalStyles"

export default function App() 
{
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1"> The Wild Oasis </Heading>
            <div>
              <Button variation="primary" size="medium">Check in</Button>   
              <Button variation="secondary" size="small">Check out</Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h2"> Forms </Heading>
            <form>
              <Input type="number" placeholder="number of guests" />
              <Input type="number" placeholder="number of guests" />
            </form>
          </Row>

          <Heading as="h3"> Page </Heading>
        </Row>
      </StyledApp>
    </>
  )
}