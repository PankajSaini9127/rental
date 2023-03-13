import React, { useEffect, useState } from "react";



import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";
import DataTable from "../Manager/DataTable";

const options = ["New Agreement","Monthly Payment","Rental"]


export default function MonthalyList() {
    const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
      <HamburgerMenu navigateTo={'listing'}/>

      <ListingComponent
        title1={'Rental Agreement'}
        title={'Monthly Payment'}
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
  )
}
