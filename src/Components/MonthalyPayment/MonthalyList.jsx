import React, {  useEffect, useState } from "react";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate, useParams } from "react-router-dom";
import { get_paid_monthly_payment, get_search_monthly_rent_manager, get_search_monthly_rent_manager_paid, listMonthRent } from "../../Services/Services";
import { useSelector } from "react-redux";
import HamburgerManager from "../Manager/HamburgerManager";
// const options = ["New Agreement","Monthly Payment","Rental"]


export default function MonthalyList() {

  const {type} = useParams();


    const [Select, setSelect] = useState("New Agreement");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
const navigate = useNavigate();

  //search
  const [searchValue,setsearchValue] =useState('');


const { auth, refresh } = useSelector((state) => state);

  // api call for get data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const APICALL = async () => {
    setLoading(true);
    setData([]);
    const result = await listMonthRent({id : auth.id});
    console.log(result);
    if (result.status === 200) {
      //   const data = result.data.data.reverse();
      setData(result.data);
      setLoading(false);
    }
  };

  //get monthly payment paid
  const get_monthly_payment_paid = async () => {
    setLoading(true);
    setData([]);
    const result = await get_paid_monthly_payment(auth.id);
    console.log(result);
    if (result.status === 200) {
      //   const data = result.data.data.reverse();
      setData(result.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(type === "in-process"){
      APICALL();
    }else if(type=== "paid"){
      get_monthly_payment_paid()
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

  const row = data.map((item, index) => {
    console.log(parseFloat((item.rent_amount/100*18)+item.rent_amount).toFixed(2))

    return {
      id: item.id,
      landlord_name: item.landlord_name,
      rent_amount:parseFloat(item.rent_amount).toFixed(2),
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
      gst_fee:parseFloat(item.rent_amount/100*18).toFixed(2),
      total_rent :item.gst? parseFloat((Number(item.rent_amount)/100*18)+Number(item.rent_amount)).toFixed(2) : parseFloat(item.rent_amount).toFixed(2)

    };
  });

  async function SearchAPi(id,searchValue){
    if(type === "in-process"){
      const search = await get_search_monthly_rent_manager(id,searchValue)
      if(search.status === 200){
        setData(search.data)
      }
    }else if(type=== "paid"){
      const search = await get_search_monthly_rent_manager_paid(id,searchValue)
      if(search.status === 200){
        setData(search.data)
      }
    }

  
  } 


  function handleSerachChange (e){
    setsearchValue(e.target.value)
    SearchAPi(auth.id,searchValue)
    console.log(searchValue)
  }

  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
      
<HamburgerManager/>

      <ListingComponent
        title1={'Rental Management System'}
        title={'Monthly Payment'}
        // options={options}
        value={Select}
        Table={DataTable}
        onChange={handleChange}
        dropDown={false}
        // setSortBy = {setSortBy}
        rows={row}
        searchValue={searchValue}
        // setsearchValue={setsearchValue}
        handleSerachChange={handleSerachChange}
      />
    </Stack>
  </>
  )
}
