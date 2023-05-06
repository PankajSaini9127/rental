import React from "react";
import HamburgerMenu from "../HamburgerMenu";
import { useNavigate } from "react-router-dom";

function HamburgerManager() {

  return (
    <HamburgerMenu
      navigateHome={"dashboard"}
      monthlyBtn="true"
      agreements={[
        { text: "In-Process ", navigateTo: "/listing/in-procces-ag" },
        { text: "Approved ", navigateTo: "/listing/approved-ag" },
        { text: "Renewal ", navigateTo: "/renewal" },
        { text: "Landlord List", navigateTo: "/list-landlord" },
      ]}
      monthly={[
        { text: "In-Process", navigateTo: "/monthly-payment/in-process" },
        { text: "Paid", navigateTo: "/monthly-payment/paid" },
      ]}
      misReports={[
        { text: "Rental MIS Reports", navigateTo: "/rental-mis-reports" },
        { text:"Graph Reports",navigateTo:"/graph-reports"},
        {text:"Rent Paid Schedule",navigateTo:"/rent-paid-schedule"}
      ]}
    />
  );
}

export default HamburgerManager;
