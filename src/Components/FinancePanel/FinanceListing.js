import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import {
  get_search_srmanager,
  get_finance_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import FinanceTable from "./FinanceDataTable";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box } from "@mui/system";

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
      setRows(response.data.ids.map((item) => {
        return {
          
          i: response.data.agreement[item].id,
          id: response.data.agreement[item].agreement_id,
          status: response.data.agreement[item].status,
          code: response.data.agreement[item].code,
          name: response.data.agreement[item].name,
          location: response.data.agreement[item].location,
          address: response.data.agreement[item].address,
          rentalAmount: response.data.agreement[item].monthlyRent,
          utr_number : response.data.agreement[item].utr_number,
          checkbox: response.data.agreement[item].status
        };
      }))
    }
  };


  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    if (searchValue) {
      const search = await get_search_srmanager(id, searchValue);
      setData(search.data);
    }
  }

  function handleSerachChange(e){
    SearchAPi(finance_ID, searchValue);
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
          />
           <Box className="backButton">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            size={"large"}
          >
            <ArrowCircleLeftIcon
              sx={{ fontSize: "3rem" }}
              color="#FFFFF !important"
            />
          </IconButton>
        </Box>
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
