import React from 'react'
import HamburgerMenu from '../HamburgerMenu'
import { useNavigate } from 'react-router-dom'

function HamburgerManager() {

    const navigate = useNavigate()
    
  return (
    
    <HamburgerMenu
    navigateHome={"dashboard"}
    // handleListing={() => navigate("/listing")}
    // monthlyRent={() => navigate("/monthly-payment")}
    // renewal={() => navigate(`/renewal`)}
    monthlyBtn="true"
    agreements={[{text:"In-Process Agreements",navigateTo:"/listing/in-procces-ag"},{text:"Approved Agreements",navigateTo:"/listing/approved-ag",},{text:"Renewed Agreements",navigateTo:"/renewal"}]}
    monthly={[{text:"In-Process",navigateTo:"/monthly-payment/in-process"},{text:"Paid",navigateTo:"/monthly-payment/paid"}]}
  />
  )
}

export default HamburgerManager
