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
  get_total_agreements,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import moment from "moment";
import HamburgerManager from "./HamburgerManager";

function Listing() {
  const [Select, setSelect] = useState("New Agreement");
  const [data, setData] = useState([]);

  const { params } = useParams();

  console.log(params);

  const { refresh, auth } = useSelector((s) => s);

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const [agreement, setAgreement] = useState({});

  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState([]);

  // for in precess agreements
  async function APICALL(id) {
    try {
      setLoading(true);
      setData([]);
      const result = await get_agreements(id);

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

  // for in precess agreements
  async function get_approved_agreemnt(id) {
    try {
      setLoading(true);
      setData([]);
      const result = await get_approved_agreements(id);

      console.log(result);

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

  //get all agreememnts
  async function get_all_agreements(id) {
    try {
      setLoading(true);
      setData([]);
      const result = await get_total_agreements(id);

      console.log(result);

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

  //in process search
  async function SearchAPi(searchValue) {
    const search = await get_search_manager(searchValue);
    setData(search.data.ids);
    setAgreement(search.data.agreement);
  }

  //approved search
  async function SearchAPi_Approve(searchValue) {
    const search = await get_search_manager_approved(searchValue);
    setData(search.data.ids);
    setAgreement(search.data.agreement);
  }

  //in process seerach
  async function SearchAPi_inprocess(searchValue) {
    const search = await get_search_manager_inprocess(searchValue);
    setData(search.data.ids);
    setAgreement(search.data.agreement);
  }

  useEffect(() => {
    if (params === "in-procces-ag") {
      APICALL(auth.id);
    } else if (params === "approved-ag") {
      get_approved_agreemnt(auth.id);
    } else if (params === "total-ag") {
      get_all_agreements(auth.id);
    } else if (params === "old-ag") {
      get_old_ag(auth.id);
    }
  }, [refresh, params]);

  // console.log(data);
  const row = 
    params === "old-ag" ?    data.map((item) => {
      console.log(item);
      return {
        id: item.agreement_id,
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
        type:item.type === "Old"? "Old" :"New/Renewal"
      };
    })  :
    data.map((item) => {
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
        type: agreement[item].type === "Renewed" ? "Renewal" : agreement[item].type === "Old"?"Old" : "New",
        address: agreement[item].address,
        city: agreement[item].city,
        state: agreement[item].state,
        deposit: parseFloat(agreement[item].deposit).toFixed(0),
        type:agreement[item].type === "Old"? "Old" :"New/Renewal"
      };
    })
  

  

  function handleSerachChange(e) {
    if (params === "in-procces-ag") {
      SearchAPi_inprocess(e.target.value);
    } else if (params === "approved-ag") {
      SearchAPi_Approve(e.target.value);
    } else if (params === "total-ag") {
      SearchAPi(e.target.value);
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
          onChange={handleChange}
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

export default Listing;
