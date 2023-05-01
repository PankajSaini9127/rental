import React from "react";
import HamburgerMenu from "../HamburgerMenu";
import { useNavigate } from "react-router-dom";

function OperationsHamburger() {
  const navigate = useNavigate();
  return (
    <HamburgerMenu
      navigateHome={"operationsDashboard"}
      // handleListing={() => navigate("/operationsListing")}
      // monthlyRent={() => navigate("/opr-monthly-rent")}
      // renewal={() => navigate("/opr-monthly-rent")}
      agreements={[
        {
          text: "In-Process",
          navigateTo: "/operationsListing/in-procces-ag",
        },
        {
          text: "Approved",
          navigateTo: "/operationsListing/approved-ag",
        },
      ]}
      monthly={[
        { text: "In-Process", navigateTo: "/opr-monthly-rent/in-process" },
        { text: "Paid", navigateTo: "/opr-monthly-rent/paid" },
      ]}
      monthlyBtn="true"
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

export default OperationsHamburger;
