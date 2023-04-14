import { Stack } from '@mui/material'
import React from 'react'
import HamburgerMenu from '../../HamburgerMenu'
import { useNavigate } from 'react-router-dom'
import ListingComponent from '../../StyleComponents/ListingComponent'
import ListingTable from './ListingTable'

function FinanceMonthlyPayement() {
    const navigate = useNavigate()
  return (
    <>
    <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
    <HamburgerMenu
            navigateHome={"finance-dashboard"}
            handleListing={() => navigate("/finance-listing")}
            monthlyRent={() => navigate("/finance-monthly-rent")}
            renewal={() => navigate("/finance-monthly-rent")}
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

export default FinanceMonthlyPayement
