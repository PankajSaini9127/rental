import { Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import ManagerTable from "./ManagerTable";
import config from '../../config.json'



const options = ["New Agreement","Monthly Payment","Rental"]




const row = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 2,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 3,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 4,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 5,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  },
  {
    id: 7,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
  }
  
];



function SrManagerListing() { 


const [data, setData] =useState([])

 const getData = async()=>{
  const response = await axios.get(`${config.API_LIVE}/api/srmanager/agreement`)
  setData(response.data.agreements.reverse())
 } 

 const rows = data.map((item)=>{
  return {
    id: item.id,
    status: item.status,
    code: item.code,
    name: item.leeseName,
    location:item.location,
    manager:item.manager,
    rentalAmount:item.monthlyRent
  }
 })

 useEffect(()=>{
  getData()
 },[])


  return (
    <>

<Stack sx={{flexWrap:"wap",flexDirection:"row"}}>

<HamburgerMenu/>
      <ListingComponent
        title="Rental Agreement"
        buttonText="Upload"
        options={options}
        value={'New Agreement'}
        Table={ManagerTable}
        rows={rows}
      />

</Stack>
    </>
  );
}

export default SrManagerListing;
