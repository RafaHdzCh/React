import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable"

export default function Bookings() 
{
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>

      <BookingTable />
    </>
  );
}