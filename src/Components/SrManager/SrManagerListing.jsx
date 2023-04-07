import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import ManagerTable from "./ManagerTable";
import {
  get_search_srmanager,
  get_srm_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const login_srm_id = auth.id;

  const [data, setData] = useState({ ids: [] });
  const [searchValue, setsearchValue] = useState("");
  console.log(data);

  const getData = async (id) => {
    const response = await get_srm_agreements(id);
    console.log(response);
    setData(response.data);
  };

  //  console.log(data)

  //  data.ids = data.ids.reverse()

  const rows = data.ids.map((item) => {
    return {
      i: data.agreement[item].id,
      id: data.agreement[item].agreement_id,
      checkbox: data.agreement[item].status,
      status: data.agreement[item].status,
      code: data.agreement[item].code,
      name: data.agreement[item].name,
      location: data.agreement[item].location,
      manager: data.agreement[item].manager,
      rentalAmount: data.agreement[item].monthlyRent,
    };
  });

  //search
  async function SearchAPi(id, searchValue) {
    const search = await get_search_srmanager(id, searchValue);
    // setAgreement(search.data.agreement)
    setData(search.data);
    console.log(search.data);
  }

  useEffect(() => {
    if (searchValue.length >= 1) {
      SearchAPi(login_srm_id, searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    getData(login_srm_id);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <HamburgerMenu
          handleListing={() => navigate("/srManagerListing")}
          navigateHome={"srManagerDashboard"}
        />
        <ListingComponent
          title="Rental Management System"
          buttonText="Upload"
          options={options}
          value={"New Agreement"}
          Table={ManagerTable}
          rows={rows}
          dropDown={false}
          searchValue={searchValue}
          setsearchValue={setsearchValue}
        />
      </Stack>
    </>
  );
}

export default SrManagerListing;
