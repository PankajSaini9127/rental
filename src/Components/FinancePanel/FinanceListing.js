import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import {
  get_search_srmanager,
  get_finance_agreements,
  get_search_finance_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import FinanceTable from "./FinanceDataTable";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box } from "@mui/system";
import moment from "moment";
import FinanceHamburger from "./FinanceHamburger";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function FinanceListing() {
  const { auth } = useSelector((state) => state);

  const finance_ID = auth.id;
  const [rows,setRows] = useState([])

  const [data, setData] = useState([]);

  const getData = async (id) => {
    const response = await get_finance_agreements(id);
    if(response.status === 200)
    {
      // console.log(response.data)
      setData(response.data.agreement);
    
    }
  };

useEffect(()=>{
  setRows(data.map((item) => {
    console.log(item.utr_number)
    return {
      checkbox: item.status,
      id: item.landlords,
    i: item.id,
    status: item.status,
    code: item.code,
    name: item.name,
    location: item.location,
    address: item.address,
    rentalAmount: item.monthlyRent,
    deposit:parseFloat( item.deposit).toFixed(2),
    state: item.state,
    buh:item.buh,
    city:item.city,
    initiateDate : moment(item.time).format('DD-MM-YYYY'),
    type:"---",
    utr_number :item.utr_number,
    modify_date:item.modify_date
    };
  }))
},[data])
  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
      const search = await get_search_finance_agreements(id, searchValue);
      setData(search.data);
  }

  function handleSerachChange(e){
    SearchAPi(finance_ID, e.target.value);
    setsearchValue(e.target.value)
  }

  

  useEffect(() => {
    getData(finance_ID);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* {data.success && ( */}
        <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
          {/* <HamburgerMenu
            navigateHome={"finance-dashboard"}
            handleListing={() => navigate("/finance-listing")}
            monthlyRent={() => navigate("/finance-monthly-rent")}
            renewal={() => navigate("/finance-monthly-rent")}
            monthlyBtn="true"
            renewalBTN="false"
          /> */}
          <FinanceHamburger />
          <ListingComponent
            title1={"Rental Management System"}
            title="Rental Agreement"
            buttonText="Upload"
            options={options}
            value={"New Agreement"}
            setRows = {setRows}
            Table={FinanceTable}
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

export default FinanceListing;
