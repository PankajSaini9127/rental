import React, { useEffect, useState } from "react";

import DataTable from "./DataTable";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import moment from "moment";
import { Stack } from "@mui/material";
import HamburgerManager from "../HamburgerManager";
import ListingComponent from "../../StyleComponents/ListingComponent";
import { get_all_old_agreement, get_search_manager_old } from "../../../Services/Services";

function OldListing() {
  const [data, setData] = useState([]);

  const { params } = useParams();

  console.log(params);

  const { refresh, auth } = useSelector((s) => s);



  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState([]);


  //get old agreements
  async function get_old_ag(id) {
    try {
      setLoading(true);
      setData([]);
      const result = await get_all_old_agreement(id);

      console.log(result);

      if (result.status === 200) {
        const data = result.data.data;
        // setAgreement(result.data.agreement);
        setData(data);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //search
  const [searchValue, setsearchValue] = useState("");


  async function SearchAPi_OLD(searchValue) {
    const search = await get_search_manager_old(searchValue);
    console.log(search.data.data)
    setData(search.data.data);
    // setAgreement(search.data.agreement);
  }

  useEffect(() => {
     if (params === "old-ag") {
      get_old_ag(auth.id);
    }
  }, [refresh, params]);

  // console.log(data);
  const row =    data.map((item) => {
      return {
        id: item.landlord_id,
        i:item.agreement_id,
        status: item.status,
        code: item.code,
        name: item.name,
        location: item.location,
        rent_amount: item.monthlyRent,
        checkbox: item.status,
        utr_number: item.utr_number,
        rent_date: item.rent_start_date,
        initiateDate: moment(item.time).format("DD-MM-YYYY"),
        type: item.type === "Renewed" ? "Renewal" : item.type === "Old"?"Old" : "New",
        address: item.address,
        city: item.city,
        state: item.state,
        deposit: parseFloat(item.deposit).toFixed(0),
        landlord_id:item.landlord_id
      };
    })  
  

  

  function handleSerachChange(e) {
 if (params === "old-ag"){
      SearchAPi_OLD(e.target.value)
    }

    setsearchValue(e.target.value);
  }

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <HamburgerManager />

        <ListingComponent
          title1={"Rental Management System"}
          title={"Rental Agreement"}
          buttonText="Upload"
          buttonText1={params === "old-ag" ?"Add Old Agreement":"Add Agreement"}
          addbtn={true}
          Table={DataTable}
          dropDown={false}
          loading={loading}
          rows={row}
          searchValue={searchValue}
          addagreement={params === "old-ag" ? '/old-agreement': '/newAgreement'}
          // setsearchValue={setsearchValue}
          handleSerachChange={handleSerachChange}
          check={check}
          setCheck={setCheck}
        />
      </Stack>
    </>
  );
}

export default OldListing;
