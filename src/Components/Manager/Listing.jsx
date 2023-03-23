import React, { useEffect, useState } from "react";

import DataTable from "./DataTable";

import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";


function Listing() {
  const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };




 return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <HamburgerMenu navigateTo={'listing'}/>

        <ListingComponent
          title={'Rental Agreement'}
          buttonText="Upload"
          buttonText1="Add Agreement"
          addbtn={true}
          value={Select}
          Table={DataTable}
          onChange={handleChange}
          dropDown={false}
        />
      </Stack>
    </>
  );
}

export default Listing;
