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
          text: "In-Process Agreements",
          navigateTo: "/operationsListing/in-procces-ag",
        },
        {
          text: "Approved Agreements",
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
          naviagteTo: "/rental-property-dump-report",
        },
        { text:"On Boarding All Status",navigateTo:"/rental-onboarding-all-status"},
        { text:"On Boarding Deposited",navigateTo:"/rental-onboarding-deposited"}
      ]}
    />
  );
}

export default OperationsHamburger;
