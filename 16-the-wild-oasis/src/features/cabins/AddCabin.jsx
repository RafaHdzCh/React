import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin()
{
  const [isOpenModal, SetIsOpenModal] = useState(false)

  return(
    <div>
      <Button onClick={()=>SetIsOpenModal(show=>!show)}>Add new cabin</Button>
      {
        isOpenModal && 
        <Modal onClose={() => SetIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => SetIsOpenModal(false)}/>
        </Modal>
        }
    </div>
  )
}