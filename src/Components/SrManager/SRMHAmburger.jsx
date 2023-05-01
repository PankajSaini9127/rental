import React from "react";
import HamburgerMenu from "../HamburgerMenu";

function SRMHamburger() {
  return (
    <HamburgerMenu
      navigateHome={"srManagerDashboard"}
      monthlyBtn="true"
      agreements={[
        {
          text: "In-Process ",
          navigateTo: "/srManagerListing/in-procces-ag",
        },
        {
          text: "Approved ",
          navigateTo: "/srManagerListing/approved-ag",
        },
        { text: "Renewal", navigateTo: "/srm-renewal-list" },
      ]}
      monthly={[
        { text: "In-Process", navigateTo: "/srm-monthly-rent/in-process" },
        { text: "Paid", navigateTo: "/srm-monthly-rent/paid" },
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

export default SRMHamburger;

// handleListing={() => navigate("/srManagerListing")}
// navigateHome={"srManagerDashboard"}
// monthlyRent={() => navigate("/srm-monthly-rent")}
// renewal={() => navigate("/srm-renewal-list")}
