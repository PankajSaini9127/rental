import React, { useEffect, useState } from "react";



import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";
import DataTable from "./DataTable";

const options = ["New Agreement","Monthly Payment","Rental"]


export default function RenewalList() {
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
        title={'Renewal'}
        buttonText="Upload"
        buttonText1="Add Agreement"
        addbtn={true}
        options={options}
        value={Select}
        Table={DataTable}
        onChange={handleChange}
        dropDown={false}
      />
    </Stack>
  </>
  )
}
