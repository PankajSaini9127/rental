import React, {  useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import { listMonthRent } from "../../Services/Services";
import { useSelector } from "react-redux";

// const options = ["New Agreement","Monthly Payment","Rental"]


export default function MonthalyList() {
    const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
const navigate = useNavigate();


const { auth, refresh } = useSelector((state) => state);

  // api call for get data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const APICALL = async () => {
    setLoading(true);
    setData([]);
    const result = await listMonthRent(auth.id);
    console.log(result);
    if (result.status === 200) {
      //   const data = result.data.data.reverse();
      setData(result.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    APICALL();
  }, [refresh]);

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

  const row = data.map((item, index) => {
    // console.log(item.rent_date)

    return {
      id: item.id,
      landlord_name: item.landlord_name,
      rent_amount:item.gst? parseFloat((item.rent_amount/100*18)+item.rent_amount).toFixed(2) : parseFloat(item.rent_amount).toFixed(2),
      rent_date:
        month[new Date(item.rent_date).getUTCMonth()] +
        " " +
        new Date(item.rent_date).getFullYear(),
      payment_date: item.payment_date || "---",
      share: item.share,
      monthly_rent: item.monthly_rent,
      code: item.code,
      location: item.location,
      gst: item.gst || "---",
      utr_no: item.utr_no || "---",
      status: item.status,
      checkbox: item.gst,
    };
  });

  // async function SearchAPi(id,searchValue){
  //   const search = await get_search_monthly_rent_srm(id,searchValue)
  //   setAgIds(search.data.ids)
  //   setRent(search.data.agreement)
  // } 

  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
    <HamburgerMenu
      navigateHome={'dashboard'}
          handleListing={()=>navigate('/listing')}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn='true'
        />

      <ListingComponent
        title1={'Rental Management System'}
        title={'Monthly Payment'}
        // options={options}
        value={Select}
        Table={DataTable}
        onChange={handleChange}
        dropDown={false}
        // rows={row}
      />
    </Stack>
  </>
  )
}
