import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../HamburgerMenu";
import { useNavigate, useParams } from "react-router-dom";
import ListingComponent from "../../StyleComponents/ListingComponent";
import ListingTable from "./ListingTable";
import {
  get_monthlt_rent_finance,
  get_monthlt_rent_finance_paid,
  get_search_monthly_rent_finance,
  get_search_monthly_rent_finance_paid,
} from "../../../Services/Services";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import FinanceHamburger from "../FinanceHamburger";

function FinanceMonthlyPayement() {

  const { type } = useParams()
  const navigate = useNavigate();

  const { auth, refresh } = useSelector((s) => s);

  const [agIDS, setAgIds] = useState([]);
  const [rentData, setRent] = useState({});

  //search
  const [searchValue, setsearchValue] = useState("");

  async function fetchData(id) {
    try {
      const data = await get_monthlt_rent_finance(id);
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
      const data = await get_monthlt_rent_finance_paid(id);
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
      // srmanager:rentData[row].manager,
      name: rentData[row].landlord_name,
      location: rentData[row].location,
      gst: rentData[row].gst ? rentData[row].gst : "---",
      percentage: rentData[row].share,
      month_of_rent:
        month[new Date(rentData[row].rent_date).getUTCMonth()] +
        " " +
        new Date(rentData[row].rent_date).getFullYear(),
      total_month_rent: rentData[row].monthly_rent,
      rent_amount: parseFloat(rentData[row].rent_amount).toFixed(2),
      manager: rentData[row].manager_name,
      operations: rentData[row].operations_name,
      srm_name: rentData[row].srm_name,
      gst_fee: rentData[row].gst
        ? parseFloat((Number(rentData[row].rent_amount) / 100) * 18).toFixed(2)
        : 0,
      total_rent: rentData[row].gst
        ? parseFloat(
            (Number(rentData[row].rent_amount) / 100) * 18 +
              Number(rentData[row].rent_amount)
          ).toFixed(2)
        : parseFloat(rentData[row].rent_amount).toFixed(2),
    };
  });

  async function SearchAPi(id, searchValue) {
    const search = await get_search_monthly_rent_finance(id, searchValue);
    setAgIds(search.data.ids);
    setRent(search.data.agreement);
  }

  async function Search_Paid(id, searchValue) {
    const search = await get_search_monthly_rent_finance_paid(id, searchValue);
    setAgIds(search.data.ids);
    setRent(search.data.agreement);
  }

  

  function handleSerachChange(e) {
    if(type === "in-process"){
      SearchAPi(auth.id, searchValue);
    }else if (type === "paid"){
      Search_Paid(auth.id, searchValue);
    }
    
    setsearchValue(e.target.value);

    console.log(searchValue);
  }

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <FinanceHamburger />
        <ListingComponent
          title1="Rental Management System"
          title="Monthly Payment"
          buttonText="Upload"
          value={"New Agreement"}
          Table={ListingTable}
          rows={rows}
          dropDown={false}
          searchValue={searchValue}
          handleSerachChange={handleSerachChange}
        />
      </Stack>
    </>
  );
}

export default FinanceMonthlyPayement;
