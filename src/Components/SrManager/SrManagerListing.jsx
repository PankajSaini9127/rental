import { IconButton, Stack } from "@mui/material";
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
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import moment from "moment";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const login_srm_id = auth.id;

  const [data, setData] = useState({ ids: [] });
  const [searchValue, setsearchValue] = useState("");
  console.log(data);

  const getData = async (id) => {
    const response = await get_srm_agreements(id);
    if (response.status === 200) {
      setData(response.data);
    }
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
      deposit:parseFloat( data.agreement[item].deposit).toFixed(2),
      state: data.agreement[item].state,
      city:data.agreement[item].city,
      address: data.agreement[item].address,
      initiateDate : moment(data.agreement[item].time).format('DD-MM-YYYY'),
      type:"---"
    };
  });



  const { refresh } = useSelector((s) => s);

  //search
  async function SearchAPi(id, searchValue) {
    console.log(id, searchValue);
    const search = await get_search_srmanager(id, searchValue);
    // setAgreement(search.data.agreement)
    setData(search.data);
    console.log(search.data);
  }

  useEffect(() => {
    getData(login_srm_id);
  }, [refresh]);

  function handleSerachChange(e) {
    SearchAPi(login_srm_id, e.target.value);
    setsearchValue(e.target.value);
  }

  const navigate = useNavigate();

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
        <Box className="backButton"  sx={{zIndex:222}}>
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
          title1="Rental Management System"
          title="Rental Agreement"
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
    </>
  );
}

export default SrManagerListing;
