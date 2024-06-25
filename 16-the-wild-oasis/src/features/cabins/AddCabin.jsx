import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() 
{
  return (
    <Modal>
      <Modal.Open 
        opens="cabin-form"
        renderButton={(openFunction) => (<Button onClick={openFunction}>Add</Button> )}
      />
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}