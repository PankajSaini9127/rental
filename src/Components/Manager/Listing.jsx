import React, { useState } from "react";

import DataTable from "./DataTable";

import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";

const options = ["New Agreement", "Approved Agreement"];

function Listing() {
  const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <HamburgerMenu />

        <ListingComponent
          title="Rental Agreement"
          buttonText="Upload"
          buttonText1="Add Agreement"
          addbtn={true}
          options={options}
          value={Select}
          Table={DataTable}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}

export default Listing;
