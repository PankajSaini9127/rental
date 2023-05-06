import {  Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ListingComponent from "../StyleComponents/ListingComponent";
import ManagerTable from "./ManagerTable";
import {
  get_BHU_agreements,
  get_search_Agrteement_buh,
  get_BHU_agreements_approved,
  get_total_agreements,
  get_BHU_agreements_total,
  get_search_Agrteement_buh_approved,
  get_search_Agrteement_buh_total
} from "../../Services/Services";
import { useSelector } from "react-redux";

import moment from "moment";
import BUH_Hamburger from "./BUH_Hamburger";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth } = useSelector((state) => state);

  const {type} = useParams()

  const login_bhu_id = auth.id;

  const [data, setData] = useState({ ids: [] });

  //in process agreements
  const getData = async (id) => {
    const response = await get_BHU_agreements(id);
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

  //get total agreements
  async function get_total_ag (id){
    try {
      const response = await get_BHU_agreements_total(id);
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
      deposit:parseFloat( data.agreement[item].deposit).toFixed(0),
  state: data.agreement[item].state,
  city:data.agreement[item].city,
  address: data.agreement[item].address,
  initiateDate : moment(data.agreement[item].time).format('DD-MM-YYYY'),
  type: data.agreement[item].type === "Renewed" ? "Renewal" : "New",
    };
  });

  

  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    if (searchValue) {
      if(type === "in-procces-ag"){
        const search = await get_search_Agrteement_buh(id, searchValue);
        search.status === 200 && setData(search.data);
      }else if(type === "approved-ag"){
        const search = await get_search_Agrteement_buh_approved(id, searchValue);
        search.status === 200 && setData(search.data);
      }else if(type === "total-ag"){
        const search = await get_search_Agrteement_buh_total(id, searchValue);
        search.status === 200 && setData(search.data);
      }
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
    }else if(type === "total-ag"){
      get_total_ag(login_bhu_id)
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
