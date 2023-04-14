import { Stack } from '@mui/material'
import React from 'react'
import HamburgerMenu from '../../HamburgerMenu'
import { useNavigate } from 'react-router-dom'
import ListingComponent from '../../StyleComponents/ListingComponent'
import ListingTable from './ListingTable'

function BUHMonthlyPayement() {
    const navigate = useNavigate()
  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
    <HamburgerMenu
          navigateHome={"BHUDashboard"}
          handleListing={() => navigate("/BHUListing")}
          monthlyRent={() => navigate("/buh-monthly-rent")}
          renewal={() => navigate("/buh-monthly-rent")}
          monthlyBtn="true"
        />
        <ListingComponent
          title1="Rental Management System"
          title="Rental Agreement"
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

export default BUHMonthlyPayement
