import React, {  useState } from "react";



import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";

// const options = ["New Agreement","Monthly Payment","Rental"]


export default function MonthalyList() {
    const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
const navigate = useNavigate();
  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
    <HamburgerMenu
      navigateHome={'dashboard'}
          handleListing={()=>navigate('/listing')}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn='true'
        />

      <ListingComponent
        title1={'Rental Management System'}
        title={'Monthly Payment'}
        // options={options}
        value={Select}
        Table={DataTable}
        onChange={handleChange}
        dropDown={false}
      />
    </Stack>
  </>
  )
}
