import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import ManagerTable from "./ManagerTable";
import {
  get_search_srmanager,
  get_srm_agreements,
  get_srm_agreements_approved,
  get_srm_agreements_total,
  get_srm_terminated_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import moment from "moment";
import SRMHamburger from "./SRMHAmburger";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const {type} = useParams()

  const login_srm_id = auth.id;

  const [data, setData] = useState({ ids: [] });
  const [searchValue, setsearchValue] = useState("");
  console.log(data);

  const getData = async (id) => {
    try {
      let response ;
    if(type === "in-procces-ag"){
      response = await get_srm_agreements(id);
    }else if(type === "approved-ag"){
      response = await get_srm_agreements_approved(id);
    }else if(type === "total-ag"){
      response = await get_srm_agreements_total(id);
    }else if (type === "terminated-ag") {
      response = await get_srm_terminated_agreements(id);
    }

    if (response.status === 200) {
      setData(response.data);
    }

    } catch (error) {
      console.log(error)
    }
    
   
  };

  



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
      deposit:parseFloat( data.agreement[item].deposit).toFixed(0),
      state: data.agreement[item].state,
      city:data.agreement[item].city,
      address: data.agreement[item].address,
      initiateDate : moment(data.agreement[item].time).format('DD-MM-YYYY'),
      type: data.agreement[item].type === "Renewed" ? "Renewal" : "New",
      sitevisit:data.agreement[item].site_visit_date
    };
  });



  const { refresh } = useSelector((s) => s);

  //search
  async function SearchAPi(id, searchValue) {
    try {
      let search ;
     
      if(type === "in-procces-ag"){
        search = await get_search_srmanager(id, {searchValue,type:"in-procces-ag"});
      }else if(type === "approved-ag"){
        search = await get_search_srmanager(id, {searchValue,type:"approved-ag"});
      }else if(type === "total-ag"){
        search = await get_search_srmanager(id, {searchValue,type:"total-ag"});
      }else if (type === "terminated-ag") {
        search = await get_search_srmanager(id, {searchValue,type:"terminated-ag"});
      }

      if(search.status === 200){
        setData(search.data);
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getData(login_srm_id);
  }, [refresh,type]);

  function handleSerachChange(e) {
    SearchAPi(login_srm_id, e.target.value);
    setsearchValue(e.target.value);
  }


  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        {/* <HamburgerMenu
          handleListing={() => navigate("/srManagerListing")}
          navigateHome={"srManagerDashboard"}
          monthlyRent={() => navigate("/srm-monthly-rent")}
          renewal={() => navigate("/srm-renewal-list")}
          monthlyBtn="true"
        /> */}
        <SRMHamburger />
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
