import { Stack } from "@mui/material";
import React from "react";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import ManagerTable from "./ManagerTable";

const options = ["New Agreement"];




const row = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 2,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 3,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 4,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 5,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 7,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  }
  
];



function SrManagerListing() {


  return (
    <>

<Stack sx={{flexWrap:"wap",flexDirection:"row"}}>

<HamburgerMenu/>
      <ListingComponent
        title="Rental Agreement"
        buttonText="Upload"
        options={options}
        // onChange={handleChange}
        value={'New Agreement'}
        Table={ManagerTable}
        rows={row}
      />

</Stack>
    </>
  );
}

export default SrManagerListing;
