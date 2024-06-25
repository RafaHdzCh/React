import React, { useState } from "react";
import styled from "styled-components";
import * as ColorIcons from "react-icons/fc";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) 
{
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, DeleteCabin } = useDeleteCabin();
  const { isLoading, CreateOrEditCabin } = useCreateCabin();
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  function handleDuplicate() 
  {
    CreateOrEditCabin(
    {
      newCabinData: 
      {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description
      }
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} alt="Cabin" />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
        <div>
          <Menus.Menu>
            <Menus.Toggle id={cabinId}/>
            <Menus.List id={cabinId}>

              <Menus.Button 
                icon={<ColorIcons.FcDocument />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button 
                icon={<ColorIcons.FcEditImage />}
                onClick={() => setShowForm(show => !show)} 
                disabled={isDeleting}
              >
                Edit
              </Menus.Button>
              <Menus.Button 
                icon={<ColorIcons.FcEmptyTrash />}
                onClick={() => DeleteCabin(cabinId)} 
                disabled={isDeleting}
              >
                Delete
              </Menus.Button>

            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>

      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}