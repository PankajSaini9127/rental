import React, { useContext, useEffect, useState } from "react";

import DataTable from "./DataTable";

import HamburgerMenu from "../HamburgerMenu";
import ListingComponent from "../StyleComponents/ListingComponent";
import { Stack } from "@mui/material";
import { get_agreements, get_search_manager } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getRowIdFromRowModel } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";


function Listing() {
  const [Select, setSelect] = useState("New Agreement");
  const [data, setData] = useState([]);

 
  
 const {refresh} = useSelector(s=>s)

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const [agreement, setAgreement] = useState({});


  const [loading, setLoading] = useState(false);
  const [check,setCheck] = useState([])


  const APICALL = async () => {
    setLoading(true);
    setData([]);
    const result = await get_agreements();

    if (result.status === 200) {
      const data = result.data.ids;
      setAgreement(result.data.agreement);
      setData(data);
      
      setLoading(false);
    }
  };
  
  
 //search
 const [searchValue,setsearchValue] =useState('');

  
 async function SearchAPi(searchValue){
   const search = await get_search_manager(searchValue)
   setData(search.data.ids)
  setAgreement(search.data.agreement)
 } 



 

const row = data.map((item) => {
    
    return {
      id: agreement[item].agreement_id,
      status: agreement[item].status,
      code: agreement[item].code,
      name: agreement[item].name,
      location: agreement[item].location,
      rentalAmount: agreement[item].monthlyRent,
      checkbox: agreement[item].status
    };
  });

  useEffect(() => {
    APICALL();
  }, [refresh]); 

const navigate =useNavigate()

function handleSerachChange (e){
  SearchAPi(searchValue)
  setsearchValue(e.target.value)
}

 return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
      <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={()=>navigate('/listing')}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn='true'
        />

        <ListingComponent
          title={'Rental Agreement'}
          buttonText="Upload"
          buttonText1="Add Agreement"
          addbtn={true}
          Table={DataTable}
          onChange={handleChange}
          dropDown={false}
          loading={loading}
          rows={row}
        searchValue={searchValue}
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