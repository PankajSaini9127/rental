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
        { text: "Terminated", navigateTo: "/srManagerListing/terminated-ag" },
        { text: "Renewal", navigateTo: "/srm-renewal-list" },
        { text: "Landlord List", navigateTo: "/list-landlord" },

      ]}
      monthly={[
        { text: "In-Process", navigateTo: "/srm-monthly-rent/in-process" },
        { text: "Paid", navigateTo: "/srm-monthly-rent/paid" },
      ]}
      misReports={[
        { text: "Rental MIS Reports", navigateTo: "/rental-mis-reports" },
        { text:"Graph Reports",navigateTo:"/graph-reports"},
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
