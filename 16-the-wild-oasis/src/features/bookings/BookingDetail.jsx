import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { deleteBooking } from "../../services/apiBookings.js";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() 
{
  const {checkout, isChekingout} = useCheckout();
  const { booking = {}, isLoading } = useBooking();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const {status, id} = booking;

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if(isLoading) return <Spinner />
  if(!booking) return <Empty resourceName="booking"/>

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      
      
      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete 
              resourceName="booking" 
              disabled={isDeleting}
              onConfirm={() => deleteBooking(id,
                {
                  onSettled: () => navigate("/bookings")
                })}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {
          status === "unconfirmed" && 
          <Button onClick={() => navigate(`/checkin/${id}`)}>
            Check in
          </Button>
        }
        {
            status === "checked-in" && 
            <Button 
              onClick={() => checkout(id)}
              disabled={isChekingout}
            >
              Check out
            </Button>
          }
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
