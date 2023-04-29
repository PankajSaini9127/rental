import React from 'react'
import HamburgerMenu from '../HamburgerMenu'

function FinanceHamburger() {


  return (
    <HamburgerMenu
    misReports= {[{text:"Rent Paid Schedule",navigateTo:"/rent-paid-schedule"}]}
    navigateHome={"finance-dashboard"}
    // handleListing={() => navigate("/finance-listing")}
    // monthlyRent={() => navigate("/finance-monthly-rent")}
    // renewal={() => navigate("/finance-monthly-rent")}
    monthlyBtn="true"
    agreements={[
      {
        text: "In-Process Agreements",
        navigateTo: "/finance-listing/in-procces-ag",
      },
      {
        text: "Approved Agreements",
        navigateTo: "/finance-listing/approved-ag",
      },
    ]}
    monthly={[
      { text: "In-Process", navigateTo: "/finance-monthly-rent/in-process" },
      { text: "Paid", navigateTo: "/finance-monthly-rent/paid" },
    ]}
  />
  )
}

export default FinanceHamburger
