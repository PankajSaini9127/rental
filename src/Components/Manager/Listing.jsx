import React, { useContext, useEffect, useState } from "react";

import DataTable from "./DataTable";

import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { IconButton, Stack } from "@mui/material";
import {
  get_agreements,
  get_all_old_agreement,
  get_approved_agreements,
  get_search_manager,
  get_search_manager_approved,
  get_search_manager_inprocess,
  get_search_manager_old,
  get_search_terminated_ag,
  get_terminated_agreements,
  get_total_agreements,
} from "../../Services/Services";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import moment from "moment";
import HamburgerManager from "./HamburgerManager";

function Listing() {
  const [data, setData] = useState([]);

  const { params } = useParams();

  console.log(params);

  const { refresh, auth } = useSelector((s) => s);

  const [agreement, setAgreement] = useState({});

  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState([]);

  // for in precess agreements
  async function APICALL(id) {
    try {
      setLoading(true);
      setData([]);
      let result;
      if (params === "in-procces-ag") {
        result = await get_agreements(id);
      } else if (params === "approved-ag") {
        result = await get_approved_agreements(id);
      } else if (params === "total-ag") {
        result = await get_total_agreements(id);
      } else if (params === "old-ag") {
        result = await get_all_old_agreement(id);
      } else if (params === "terminated-ag") {
        result = await get_terminated_agreements(id);
      }

      if (result.status === 200) {
        const data = result.data.ids;
        setAgreement(result.data.agreement);
        setData(data);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //search
  const [searchValue, setsearchValue] = useState("");

  //alll search
  async function SearchAPi(searchValue) {
    try {
      let search;

      if (params === "in-procces-ag") {
        search = await get_search_manager_inprocess(searchValue);
      } else if (params === "approved-ag") {
        search = await get_search_manager_approved(searchValue);
      } else if (params === "total-ag") {
        search = await get_search_manager(searchValue);
      } else if (params === "old-ag") {
        search = await get_search_manager_old(searchValue);
      }else if(params === "terminated-ag"){
        search = await get_search_terminated_ag(searchValue)
      }

      if (search.status === 200) {
        setData(search.data.ids);
        setAgreement(search.data.agreement);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    APICALL(auth.id);
  }, [refresh, params]);

  // console.log(data);
  const row =
    params === "old-ag"
      ? data.map((item) => {
          console.log(item.agreement_id, item.landlord_id);
          return {
            id: item.landlord_id,
            i: item.agreement_id,
            status: item.status,
            code: item.code,
            name: item.name,
            location: item.location,
            rent_amount: item.monthlyRent,
            checkbox: item.status,
            utr_number: item.utr_number,
            rent_date: item.rent_start_date,
            initiateDate: moment(item.time).format("DD-MM-YYYY"),
            type:
              item.type === "Renewed"
                ? "Renewal"
                : item.type === "Old"
                ? "Old"
                : "New",
            address: item.address,
            city: item.city,
            state: item.state,
            deposit: parseFloat(item.deposit).toFixed(0),
            landlord_id: item.landlord_id,
          };
        })
      : data.map((item) => {
          console.log(agreement[item]);
          return {
            id: agreement[item].agreement_id,
            status: agreement[item].status,
            code: agreement[item].code,
            name: agreement[item].name,
            location: agreement[item].location,
            rent_amount: agreement[item].monthlyRent,
            checkbox: agreement[item].status,
            utr_number: agreement[item].utr_number,
            rent_date: agreement[item].rent_start_date,
            initiateDate: moment(agreement[item].time).format("DD-MM-YYYY"),
            type:
              agreement[item].type === "Renewed"
                ? "Renewal"
                : agreement[item].type === "Old"
                ? "Old"
                : "New",
            address: agreement[item].address,
            city: agreement[item].city,
            state: agreement[item].state,
            deposit: parseFloat(agreement[item].deposit).toFixed(0),
            landlord_id: "",
          };
        });

  function handleSerachChange(e) {
      SearchAPi(e.target.value);

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
          buttonText1={
            params === "old-ag" ? "Add Old Agreement" : "Add Agreement"
          }
          addbtn={true}
          Table={DataTable}
          dropDown={false}
          loading={loading}
          rows={row}
          searchValue={searchValue}
          addagreement={
            params === "old-ag" ? "/old-agreement" : "/newAgreement"
          }
          // setsearchValue={setsearchValue}
          handleSerachChange={handleSerachChange}
          check={check}
          setCheck={setCheck}
        />
      </Stack>
    </>
  );
}

export default Listing;
