import React from 'react'
import HamburgerMenu from '../HamburgerMenu'

function BUH_Hamburger() {
  return (
    <HamburgerMenu
    navigateHome={"BHUDashboard"}
    agreements={[
        {
          text: "In-Process",
          navigateTo: "/BHUListing/in-procces-ag",
        },
        {
          text: "Approved",
          navigateTo: "/BHUListing/approved-ag",
        }
      ]}
  />
  )
}

export default BUH_Hamburger
