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

const options = ["New Agreement", "Monthly Payment", "Rental"];

function FinanceListing() {
  const { auth } = useSelector((state) => state);

  const finance_ID = auth.id;
  const [rows,setRows] = useState([])

  const [data, setData] = useState({ ids: [] });

  const getData = async (id) => {
    const response = await get_finance_agreements(id);
    if(response.status === 200)
    {
      setData(response.data );
    
    }
  };

useEffect(()=>{
  setRows(data.ids.map((item) => {
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
    buh:data.agreement[item].buh,
    city:data.agreement[item].city,
    initiateDate : moment(data.agreement[item].time).format('DD-MM-YYYY'),
    type:"---",
    utr_number :data.agreement[item].utr_number

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
          <HamburgerMenu
            navigateHome={"finance-dashboard"}
            handleListing={() => navigate("/finance-listing")}
            monthlyRent={() => navigate("/finance-monthly-rent")}
            renewal={() => navigate("/finance-monthly-rent")}
            monthlyBtn="true"
            renewalBTN="false"
          />
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
