import { Box, IconButton, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import {
  get_search_srmanager,
  get_Operations_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import OperationsTable from "./OperationsTable";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const login_operations_id = auth.id;

  const [data, setData] = useState({ ids: [] });

  const getData = async (id) => {
    const response = await get_Operations_agreements(id);
    console.log(response.data)
    setData(response.data );
  };

  console.log(data)

  const rows = data.ids.map((item) => {
    return {
      checkbox: data.agreement[item].status,
      i: data.agreement[item].id,
      id: data.agreement[item].agreement_id,
      status: data.agreement[item].status,
      code: data.agreement[item].code,
      name: data.agreement[item].name,
      location: data.agreement[item].location,
      address: data.agreement[item].address,
      rentalAmount: data.agreement[item].monthlyRent,
    };
  });

  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    if (searchValue) {
      const search = await get_search_srmanager(id, searchValue);
      setData(search.data);
    }
  }


  function handleSerachChange(e){
    SearchAPi(login_operations_id, searchValue);
    setsearchValue(e.target.value)
  }



  useEffect(() => {
    getData(login_operations_id);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* {data.success && ( */}
        <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
          <HamburgerMenu
            navigateHome={"operationsDashboard"}
            handleListing={() => navigate("/operationsListing")}
            monthlyRent={() => navigate("/opr-monthly-rent")}
            renewal={() => navigate("/opr-monthly-rent")}
            monthlyBtn="true"
            renewalBTN="false"
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
            title1={'Rental Management System'}
            title="Rental Agreement"
            buttonText="Upload"
            options={options}
            value={"New Agreement"}
            Table={OperationsTable}
            rows={rows}
            dropDown={false}
            searchValue={searchValue}
            // setsearchValue={setsearchValue}
            handleSerachChange={handleSerachChange}
          />
        </Stack>
      {/* )} */}
    </>
  );
}

export default SrManagerListing;
