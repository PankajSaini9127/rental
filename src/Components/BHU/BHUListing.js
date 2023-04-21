import { IconButton, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import ManagerTable from "./ManagerTable";
import {
  get_search_srmanager,
  get_BHU_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const login_bhu_id = auth.id;

  const [data, setData] = useState({ ids: [] });

  const getData = async (id) => {
    const response = await get_BHU_agreements(id);
    console.log(response);
    setData(response.data);
  };

  console.log(data.ids);
  const rows = data.ids.map((item) => {
    return {
      checkbox: data.agreement[item].status,
      i: data.agreement[item].id,
      id: data.agreement[item].agreement_id,
      state: data.agreement[item].state,
      status: data.agreement[item].status,
      code: data.agreement[item].code,
      name: data.agreement[item].name,
      location: data.agreement[item].location,
      manager: data.agreement[item].manager_name,
      rentalAmount: data.agreement[item].monthlyRent,
      sr_manager: data.agreement[item].sr_manager,
    };
  });

  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    if (searchValue) {
      const search = await get_search_srmanager(id, searchValue);
      // setAgreement(search.data.agreement)
      setData(search.data);
    }
  }

  function handleSerachChange(e){
    SearchAPi(login_bhu_id, searchValue);
    setsearchValue(e.target.value)
  }
  const {refresh} = useSelector(s=>s)

  useEffect(() => {
    getData(login_bhu_id);
  }, [refresh]);

  const navigate = useNavigate();

  return (
    <>
      {data.success && (
        <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
          <HamburgerMenu
          navigateHome={"BHUDashboard"}
          handleListing={() => navigate("/BHUListing")}
          // monthlyRent={() => navigate("/buh-monthly-rent")}
          // renewal={() => navigate("/buh-monthly-rent")}
          // monthlyBtn="true"
        />
        <Box className="backButton">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            size={"large"}
          >
            <ArrowCircleLeftIcon
              sx={{ fontSize: "3rem" }}
              color="#FFFFF !important"
            />
          </IconButton>
        </Box>
          <ListingComponent
            title="Rental Agreement"
            title1={"Rental Management System"}
            buttonText="Upload"
            options={options}
            value={"New Agreement"}
            Table={ManagerTable}
            rows={rows}
            dropDown={false}
            searchValue={searchValue}
            // setsearchValue={setsearchValue}
            handleSerachChange={handleSerachChange}
          />
        </Stack>
      )}
    </>
  );
}

export default SrManagerListing;
