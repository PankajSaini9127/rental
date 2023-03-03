import { Stack } from "@mui/material";
import React from "react";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import FinanceTable from "./FinanceTable";

const options = ["New Agreement"];

const row = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    srManger: "John Doe",
    rentalAmount: 10000,
  },
  {
    id: 2,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    rentalAmount: 10000,
    srManger: "John Doe",
  },
  {
    id: 3,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    rentalAmount: 10000,
    srManger: "John Doe",
  },
  {
    id: 4,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    rentalAmount: 10000,
    srManger: "John Doe",
  },
  {
    id: 5,
    status: "Approved",
    srManger: "John Doe",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    rentalAmount: 10000,
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    rentalAmount: 10000,
    srManger: "John Doe",
  },
  {
    id: 7,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location: "Rajsthan",
    manager: "John Doe",
    rentalAmount: 10000,
    srManger: "John Doe",
  },
];

function FinanceStatus() {
  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <HamburgerMenu />
        <ListingComponent
          title="Rental Agreement"
          buttonText="Upload"
          options={options}
          // onChange={handleChange}
          value={"New Agreement"}
          Table={FinanceTable}
          rows={row}
        />
      </Stack>
    </>
  );
}

export default FinanceStatus;
