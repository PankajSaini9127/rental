import React, { useEffect, useState } from "react";


import { Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../../HamburgerMenu";
import ListingComponent from "../../StyleComponents/ListingComponent";



export default function SrmRenwalList() {
    const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
const navigate = useNavigate()
  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
    <HamburgerMenu
          handleListing={() => navigate("/srManagerListing")}
          navigateHome={"srManagerDashboard"}
          monthlyRent={() => navigate("/srm-monthly-rent")}
          renewal={() => navigate("/srm-renewal-list")}
          monthlyBtn="true"
        />

      <ListingComponent
        title1={'Rental Management System'}
        title={'Renewal'}
        // value={Select}
        Table={DataTable}
        onChange={handleChange}
        dropDown={false}
      />
    </Stack>
  </>
  )
}
