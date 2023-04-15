import { Stack } from '@mui/material'
import React from 'react'
import HamburgerMenu from '../../HamburgerMenu'
import { useNavigate } from 'react-router-dom'
import ListingComponent from '../../StyleComponents/ListingComponent'
import ListingTable from './ListingTable'

function MonthlyPayement() {
    const navigate = useNavigate()

    
  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
         <HamburgerMenu
          handleListing={() => navigate("/srManagerListing")}
          navigateHome={"srManagerDashboard"}
          monthlyRent={() => navigate("/srm-monthly-rent")}
          renewal={() => navigate("/srm-monthly-rent")}
          monthlyBtn="true"
        />
        <ListingComponent
          title1="Rental Management System"
          title="Monthly Payment"
          buttonText="Upload"
        //   options={options}
          value={"New Agreement"}
          Table={ListingTable}
        //   rows={rows}
          dropDown={false}
        //   searchValue={searchValue}
        //   // setsearchValue={setsearchValue}
        //   handleSerachChange={handleSerachChange}
        />
      </Stack>
    </>
  )
}

export default MonthlyPayement
