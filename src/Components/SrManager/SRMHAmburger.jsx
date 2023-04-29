import React from "react";
import HamburgerMenu from "../HamburgerMenu";

function SRMHamburger() {
  return (
    <HamburgerMenu
      navigateHome={"srManagerDashboard"}
      monthlyBtn="true"
      agreements={[
        {
          text: "In-Process Agreements",
          navigateTo: "/srManagerListing/in-procces-ag",
        },
        {
          text: "Approved Agreements",
          navigateTo: "/srManagerListing/approved-ag",
        },
        { text: "Renewed Agreements", navigateTo: "/srm-renewal-list" },
      ]}
      monthly={[
        { text: "In-Process", navigateTo: "/srm-monthly-rent/in-process" },
        { text: "Paid", navigateTo: "/srm-monthly-rent/paid" },
      ]}
    />
  );
}

export default SRMHamburger;

// handleListing={() => navigate("/srManagerListing")}
// navigateHome={"srManagerDashboard"}
// monthlyRent={() => navigate("/srm-monthly-rent")}
// renewal={() => navigate("/srm-renewal-list")}
