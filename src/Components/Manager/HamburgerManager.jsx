import React from "react";
import HamburgerMenu from "../HamburgerMenu";
import { useNavigate } from "react-router-dom";

function HamburgerManager() {

  return (
    <HamburgerMenu
      navigateHome={"dashboard"}
      // handleListing={() => navigate("/listing")}
      // monthlyRent={() => navigate("/monthly-payment")}
      // renewal={() => navigate(`/renewal`)}
      monthlyBtn="true"
      agreements={[
        { text: "In-Process ", navigateTo: "/listing/in-procces-ag" },
        { text: "Approved ", navigateTo: "/listing/approved-ag" },
        { text: "Renewal ", navigateTo: "/renewal" },
      ]}
      monthly={[
        { text: "In-Process", navigateTo: "/monthly-payment/in-process" },
        { text: "Paid", navigateTo: "/monthly-payment/paid" },
      ]}
      misReports={[
        { text: "Payment MIS Report", navigateTo: "/rental-payment-mis" },
        {
          text: "Property Dump Report",
          navigateTo: "/rental-property-dump-report",
        },
        { text:"On Boarding All Status",navigateTo:"/rental-onboarding-all-status"},
        { text:"On Boarding Deposited",navigateTo:"/rental-onboarding-deposited"},
        {text:"Rent Paid Schedule",navigateTo:"/rent-paid-schedule"}
      ]}
    />
  );
}

export default HamburgerManager;
