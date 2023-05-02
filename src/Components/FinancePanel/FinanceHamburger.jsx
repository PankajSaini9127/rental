import React from 'react'
import HamburgerMenu from '../HamburgerMenu'

function FinanceHamburger() {


  return (
    <HamburgerMenu
    misReports= {[
      
      // { text: "Rental MIS Reports", navigateTo: "/rental-mis-reports" },
      // { text:"Graph Reports",navigateTo:"/graph-reports"},
      {text:"Rent Paid Schedule",navigateTo:"/rent-paid-schedule"}
    ]}
    navigateHome={"finance-dashboard"}
    monthlyBtn="true"
    agreements={[
      {
        text: "In-Process",
        navigateTo: "/finance-listing/in-procces-ag",
      },
      {
        text: "Approved",
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
