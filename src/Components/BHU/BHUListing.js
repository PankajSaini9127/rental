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
  get_search_Agrteement_buh,
  get_BHU_agreements_approved
} from "../../Services/Services";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import moment from "moment";
import BUH_Hamburger from "./BUH_Hamburger";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const {type} = useParams()

  const login_bhu_id = auth.id;

  const [data, setData] = useState({ ids: [] });

  const getData = async (id) => {
    const response = await get_BHU_agreements(id);
    console.log(response);
    setData(response.data);
  };


  async function get_approved_agreements (id){
    try {
      const response = await get_BHU_agreements_approved(id);
    console.log(response);
    setData(response.data);
    } catch (error) {
      console.log(error)
    }
  }

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
      deposit:parseFloat( data.agreement[item].deposit).toFixed(2),
  state: data.agreement[item].state,
  city:data.agreement[item].city,
  address: data.agreement[item].address,
  initiateDate : moment(data.agreement[item].time).format('DD-MM-YYYY'),
  type:"---"
    };
  });

  

  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    if (searchValue) {
      const search = await get_search_Agrteement_buh(id, searchValue);
      // setAgreement(search.data.agreement)
      setData(search.data);
    }
  }

  function handleSerachChange(e){
    SearchAPi(login_bhu_id, e.target.value);
    setsearchValue(e.target.value)
  }
  const {refresh} = useSelector(s=>s)

  useEffect(() => {
    if(type === "in-procces-ag"){
      getData(login_bhu_id);
    }else if(type === "approved-ag"){
      get_approved_agreements(login_bhu_id)
    }
    
  }, [refresh,type]);

  const navigate = useNavigate();

  return (
    <>
      {data.success && (
        <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
          {/* <HamburgerMenu
          navigateHome={"BHUDashboard"}
          handleListing={() => navigate("/BHUListing")}
          // monthlyRent={() => navigate("/buh-monthly-rent")}
          // renewal={() => navigate("/buh-monthly-rent")}
          // monthlyBtn="true"
        /> */}
        <BUH_Hamburger/>
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
