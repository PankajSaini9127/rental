import React, {  useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { IconButton, Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import { get_search_monthly_rent_manager, listMonthRent } from "../../Services/Services";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
// const options = ["New Agreement","Monthly Payment","Rental"]


export default function MonthalyList() {
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
    console.log(parseFloat((item.rent_amount/100*18)+item.rent_amount).toFixed(2))

    return {
      id: item.id,
      landlord_name: item.landlord_name,
      rent_amount:item.rent_amount,
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
    const search = await get_search_monthly_rent_manager(id,searchValue)
    setData(search.data)
    // setAgIds(search.data.ids)
    // setRent(search.data.agreement)
  } 


  function handleSerachChange (e){
    
    setsearchValue(e.target.value)
    SearchAPi(auth.id,searchValue)

    console.log(searchValue)
  }

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
        title1={'Rental Management System'}
        title={'Monthly Payment'}
        // options={options}
        value={Select}
        Table={DataTable}
        onChange={handleChange}
        dropDown={false}
        rows={row}
        searchValue={searchValue}
        // setsearchValue={setsearchValue}
        handleSerachChange={handleSerachChange}
      />
    </Stack>
  </>
  )
}
