import React from 'react'
import HamburgerMenu from '../HamburgerMenu'

function BUH_Hamburger() {
  return (
    <HamburgerMenu
    navigateHome={"BHUDashboard"}
    agreements={[
        {
          text: "In-Process Agreements",
          navigateTo: "/BHUListing/in-procces-ag",
        },
        {
          text: "Approved Agreements",
          navigateTo: "/BHUListing/approved-ag",
        }
      ]}
  />
  )
}

export default BUH_Hamburger
