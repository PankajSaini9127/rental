import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../HamburgerMenu";
import { useNavigate, useParams } from "react-router-dom";
import ListingComponent from "../../StyleComponents/ListingComponent";
import ListingTable from "./ListingTable";
import {
  get_monthlt_rent_opr,
  get_monthlt_rent_opr_paid,
  get_search_monthly_rent_operations,
  get_search_monthly_rent_operations_paid,
} from "../../../Services/Services";
import { useSelector } from "react-redux";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box } from "@mui/system";
import OperationsHamburger from "../OperationsHamburger";

function OperationsMonthlyPayement() {
  const navigate = useNavigate();

  const {type} = useParams()

  const [agIDS, setAgIds] = useState([]);
  const [rentData, setRent] = useState({});

  //search
  const [searchValue, setsearchValue] = useState("");

  const { auth, refresh } = useSelector((s) => s);

  async function fetchData(id) {
    try {
      const data = await get_monthlt_rent_opr(id);
      console.log(data);
      if (data.data.success) {
        setAgIds(data.data.ids);
        setRent(data.data.agreement);
        console.log(data.data.agreement);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function fetchDataPaid(id) {
    try {
      const data = await get_monthlt_rent_opr_paid(id);
      console.log(data);
      if (data.data.success) {
        setAgIds(data.data.ids);
        setRent(data.data.agreement);
        console.log(data.data.agreement);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if(type === "in-process"){
      fetchData(auth.id);
    }else if (type === "paid"){
      fetchDataPaid(auth.id)
    }
  }, [refresh,type]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const rows = agIDS.map((row) => {
    return {
      id: rentData[row].id,
      code: rentData[row].code,
      checkbox: rentData[row].status,
      status: rentData[row].status,
      utr: rentData[row].utr_no,
      name: rentData[row].landlord_name,
      location: rentData[row].location,
      gst: rentData[row].gst ? rentData[row].gst : "---",
      percentage: rentData[row].share,
      month_of_rent:
        month[new Date(rentData[row].rent_date).getUTCMonth()] +
        " " +
        new Date(rentData[row].rent_date).getFullYear(),
      total_month_rent: rentData[row].monthly_rent,
      rent_amount: parseFloat(rentData[row].rent_amount).toFixed(0),
      gst_fee: rentData[row].gst
        ? parseFloat((parseInt(rentData[row].rent_amount) / 100) * 18).toFixed(0)
        : 0,
      total_rent: rentData[row].gst
        ? parseFloat(parseInt(rentData[row].rent_amount) +
          (parseInt(rentData[row].rent_amount) / 100) * 18).toFixed(0)
        : parseInt(rentData[row].rent_amount),
      manager: rentData[row].manager_name,
      srm: rentData[row].srm_name,
    };
  });

  async function SearchAPi(id, searchValue) {

    if(type === "in-process"){
      const search = await get_search_monthly_rent_operations(id, searchValue);
    setAgIds(search.data.ids);
    setRent(search.data.agreement);
    }else if (type === "paid"){
      const search = await get_search_monthly_rent_operations_paid(id, searchValue);
      setAgIds(search.data.ids);
      setRent(search.data.agreement);
    }
   
  }

  function handleSerachChange(e) {
    SearchAPi(auth.id, searchValue);
    setsearchValue(e.target.value);

    console.log(searchValue);
  }

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        {/* <HamburgerMenu
          navigateHome={"operationsDashboard"}
          handleListing={() => navigate("/operationsListing")}
          monthlyRent={() => navigate("/opr-monthly-rent")}
          renewal={() => navigate("/opr-monthly-rent")}
          monthlyBtn="true"
          renewalBTN="false"
        /> */}
        <OperationsHamburger />
        <ListingComponent
          title1="Rental Management System"
          title="Monthly Payment"
          buttonText="Upload"
          //   options={options}
          value={"New Agreement"}
          Table={ListingTable}
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

export default OperationsMonthlyPayement;
