import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import {
  get_search_srmanager,
  get_Operations_agreements,
  get_finance_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import FinanceTable from "./FinanceDataTable";

const options = ["New Agreement", "Monthly Payment", "Rental"];

function FinanceListing() {
  const { auth } = useSelector((state) => state);

  const login_operations_id = auth.id;

  const [data, setData] = useState({ ids: [] });

  const getData = async (id) => {
    const response = await get_finance_agreements(id);
    console.log(response.data)
    setData(response.data );
  };

  console.log(data)

  const rows = data.ids.map((item) => {
    return {
      i: data.agreement[item].id,
      id: data.agreement[item].agreement_id,
      status: data.agreement[item].status,
      code: data.agreement[item].code,
      name: data.agreement[item].name,
      location: data.agreement[item].location,
      address: data.agreement[item].address,
      rentalAmount: data.agreement[item].monthlyRent,
    };
  });

  const [searchValue, setsearchValue] = useState("");

  //search
  async function SearchAPi(id, searchValue) {
    if (searchValue) {
      const search = await get_search_srmanager(id, searchValue);
      setData(search.data);
    }
  }

  useEffect(() => {
    // if(searchValue.length >= 1){
    // SearchAPi(login_operations_id, searchValue);
    // }
  }, [searchValue]);

  useEffect(() => {
    getData(login_operations_id);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* {data.success && ( */}
        <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
          <HamburgerMenu
            navigateHome={"finance-dashboard"}
            handleListing={() => navigate("/finance-listing")}
          />
          <ListingComponent
            title1={"Rental Management System"}
            title="Rental Agreement"
            buttonText="Upload"
            options={options}
            value={"New Agreement"}
            Table={FinanceTable}
            rows={rows}
            dropDown={false}
            searchValue={searchValue}
            setsearchValue={setsearchValue}
          />
        </Stack>
      {/* )} */}
    </>
  );
}

export default FinanceListing;
