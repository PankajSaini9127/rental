import React, { useEffect, useState } from "react";

import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { IconButton, Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_renewal, get_search_renewal } from "../../Services/Services";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box } from "@mui/system";
import HamburgerManager from "../Manager/HamburgerManager";

export default function RenewalList() {
  const navigate = useNavigate();

  //search
  const [searchValue, setsearchValue] = useState("");

  const [agreements, setAgreements] = useState({});
  const [agIds, setAgIds] = useState([]);

  const dispatch = useDispatch();

  const { auth, refresh } = useSelector((s) => s);

  const [loading, setLoading] = useState(false);

  async function SearchAPi(searchValue, id) {
    const search = await get_search_renewal(searchValue, id);
    setAgIds(search.data.ids);
    setAgreements(search.data.agreement);
  }

  function handleSerachChange(e) {
    SearchAPi(searchValue, auth.id);
    setsearchValue(e.target.value);
  }

  console.log(searchValue);

  const APICALL = async (id) => {
    try {
      setLoading(true);
      const result = await get_renewal(id);

      console.log(result);
      if (result.data.success) {
        //   const data = result.data.data.reverse();
        setAgreements(result.data.agreement);
        setAgIds(result.data.ids);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      return dispatch({
        open: true,
        variant: "error",
        message: "Something Went Wrong Please Try Again Later.",
      });
    }
  };

  useEffect(() => {
    APICALL(auth.id);
  }, [refresh]);

  const rows = agIds.map((row) => {
    return {
      id: agreements[row].id,
      status: agreements[row].renewal_status,
      code: agreements[row].code,
      name: agreements[row].name,
      location: agreements[row].location,
      rentalAmount: agreements[row].monthlyRent,
      state: agreements[row].state,
      city: agreements[row].city,
      deposit: agreements[row].deposit,
      expiry_date: "---",
      expiry_day: "---",
      address: agreements[row].address,
    };
  });

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        {/* <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={() => navigate("/listing")}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn="true"
        /> */}
<HamburgerManager/>
        <ListingComponent
          title1={"Rental Management System"}
          title={"Renewal"}
          Table={DataTable}
          dropDown={false}
          loading={loading}
          rows={rows}
          searchValue={searchValue}
          // setsearchValue={setsearchValue}
          handleSerachChange={handleSerachChange}
        />
      </Stack>
    </>
  );
}
