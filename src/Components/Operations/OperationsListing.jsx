import config from '../../config.json'
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import OperationsTable from "./OperationsTable";

import axios from 'axios';

const options = ["New Agreement","Monthly Payment","Rental"];




const row = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  },
  {
    id: 2,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  },
  {
    id: 3,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  },
  {
    id: 4,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  },
  {
    id: 5,
    status: "Approved",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  },
  {
    id: 7,
    status: "Rejected",
    code: 123,
    name: "John Doe",
    location:"Rajsthan",
    manager:"John Doe",
    rentalAmount:10000,
    srmanager:"Adam"
  }
  
];



function OperationsListing() {

  const [selectVal, setSelectValue] = useState("New Agreement");

  const [title, setTitle]= useState("New Agreement")
   
  const handleChange =(e)=>{
    setSelectValue(e.target.value)
  }

  // useEffect(()=>{
  //     if(selectVal === "New Agreement"){
  //       setTitle("New Agreement")
  //     }
  //     if(selectVal === "Monthly Payment"){
  //       setTitle("Monthly Payment")
  //     }
  //     if(selectVal === "Rental"){
  //       setTitle("Rental")
  //     }
  // },[selectVal])

  const [data, setData] =useState([])

 const getData = async()=>{
  const response = await axios.get(`${config.API_LIVE}/api/operations/get-agreements`)
  setData(response.data.agreements.reverse())
 } 

 const rows = data.map((item)=>{
  return {
    id: item.id,
    status: "Pending",
    code: item.code,
    name: item.leeseName,
    location:item.location,
    manager:item.manager,
    srmanager:item.srmanager,
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
        title1={title}
        title="Rental Agreement"
        buttonText="Upload"
        options={options}
        onChange={handleChange}
        value={selectVal}
        Table={OperationsTable}
        rows={rows}
      />

</Stack>
    </>
  );
}

export default OperationsListing;
