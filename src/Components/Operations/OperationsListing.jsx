import { Box, IconButton, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import {
  get_search_srmanager,
  get_Operations_agreements,
  get_search_agreement_operation,
  get_Operations_agreements_approved,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import OperationsTable from "./OperationsTable";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import moment from "moment";
import OperationsHamburger from "./OperationsHamburger";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function SrManagerListing() {
  const { auth,refresh } = useSelector((state) => state);

  const {type} = useParams()

  const login_operations_id = auth.id;

  const [data, setData] = useState({ ids: [] });


  const getData = async (id) => {
    const response = await get_Operations_agreements(id);
    console.log(response.data)
    setData(response.data );
  };

  async function get_approved_agreements (id){
    try {
      const response = await get_Operations_agreements_approved(id);
    console.log(response.data)
    setData(response.data );
    } catch (error) {
      console.log(error)
    }
  }

  console.log(data)

 

  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    const search = await get_search_agreement_operation(id, searchValue);
    console.log("search")
      console.log(search)
      setData(search.data);
  
  }


  function handleSerachChange(e){
    SearchAPi(login_operations_id, e.target.value);
    setsearchValue(e.target.value)
  }


  useEffect(() => {
    if(type === "in-procces-ag"){
      getData(login_operations_id);
    }else if(type === "approved-ag"){
      get_approved_agreements(login_operations_id)
    }
    
  }, [refresh,type]);

  const navigate = useNavigate();


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
      deposit:parseFloat( data.agreement[item].deposit).toFixed(2),
      state: data.agreement[item].state,
      manager: data.agreement[item].manager_name,
      sr_manager: data.agreement[item].Sr_name,
      city:data.agreement[item].city,
      initiateDate : moment(data.agreement[item].time).format('DD-MM-YYYY'),
      type:"---"
    };
  });

  return (
    <>
      {/* {data.success && ( */}
        <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
             <OperationsHamburger/>
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
