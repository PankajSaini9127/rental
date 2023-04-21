import React, { useEffect, useState } from "react";


import { IconButton, Stack } from "@mui/material";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../../HamburgerMenu";
import ListingComponent from "../../StyleComponents/ListingComponent";
import { useDispatch, useSelector } from "react-redux";
import { get_renewal_srm, get_search_renewal_srm } from "../../../Services/Services";
import { setAlert } from "../../../store/action/action";
import { Box } from "@mui/system";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";



export default function SrmRenwalList() {
 

  //search
 const [searchValue,setsearchValue] =useState('');

  const [agreements,setAgreements] = useState({})
  const [agIds,setAgIds] = useState([])
 
  const dispatch = useDispatch()
 
   const {auth,refresh} = useSelector(s=>s)
 
   const [loading, setLoading] = useState(false)
   


  const rows =agIds.map(row=>{
    return {
        id: agreements[row].id,
        status: agreements[row].renewal_status,
        code: agreements[row].code,
        name: agreements[row].name,
        location: agreements[row].location,
        rentalAmount: agreements[row].monthlyRent,
        state:agreements[row].state,
        city:agreements[row].city,
        deposit:agreements[row].deposit,
        expiry_date:"---",
        expiry_day:"---"
      }
    })
 
    const APICALL = async(id)=>{
      try {
        setLoading(true)
        const result = await get_renewal_srm(id)
    
       console.log(result)
        if(result.data.success){
        //   const data = result.data.data.reverse();
        setAgreements(result.data.agreement)
        setAgIds(result.data.ids)
        setLoading(false)
  
        }
      } catch (error) {
        console.log(error)
        return dispatch({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."})
      }
     
    }
  
    useEffect(()=>{
      APICALL(auth.id)
    },[refresh])

    async function SearchAPi(searchValue,id){
      try {
          const search = await get_search_renewal_srm(searchValue,id)
            if(search.data.success){
              setAgIds(search.data.ids)
              setAgreements(search.data.agreement)
            }
      } catch (error) {
        console.log(error)
        dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
      }
    } 


  function handleSerachChange (e){
   SearchAPi(searchValue,auth.id)
   setsearchValue(e.target.value)
 }

const navigate = useNavigate()
  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
    <HamburgerMenu
          handleListing={() => navigate("/srManagerListing")}
          navigateHome={"srManagerDashboard"}
          monthlyRent={() => navigate("/srm-monthly-rent")}
          renewal={() => navigate("/srm-renewal-list")}
          monthlyBtn="true"
        />
<Box className="backButton"  sx={{zIndex:222}}>
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
        title={'Renewal'}
        // value={Select}
        Table={DataTable}
        // onChange={handleChange}
        dropDown={false}
        loading={loading}
        rows={rows}
      searchValue={searchValue}
      // setsearchValue={setsearchValue}
      handleSerachChange={handleSerachChange}
      />
    </Stack>
  </>
  )
}
