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
        { text: "Landlord List", navigateTo: "/list-landlord" },

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
        { text: "Rental MIS Reports", navigateTo: "/rental-mis-reports" },
        { text:"Graph Reports",navigateTo:"/graph-reports"},
        {text:"Rent Paid Schedule",navigateTo:"/rent-paid-schedule"}
      ]}
    />
  );
}

export default OperationsHamburger;
