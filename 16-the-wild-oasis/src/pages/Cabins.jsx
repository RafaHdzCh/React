import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

export default function Cabins() 
{
  const [showForm, SetShowForm] = useState(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

        <CabinTable />
      <Button onClick={()=>SetShowForm(show=>!show)}>Add new cabin</Button>
        {showForm && <CreateCabinForm />}
    </>
  );
}