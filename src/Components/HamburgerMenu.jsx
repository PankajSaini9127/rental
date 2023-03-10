import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../assest/pic/Dashboard/logo1 2.png";

import "../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { Vector1, Vector2, Vector3 } from "./Vector";
import { NavExpand, NavItem } from "./StyleComponents/HamburgerStyled";

function HamburgerMenu({navigateTo}) {
  const [expand, setExpand] = useState(false);

   const navigate = useNavigate()

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px" }}
        className={expand ? "HeroSectionMenu" : ""}
        onMouseEnter={() => setExpand(true)}
        onMouseLeave={() => {
          setExpand(false);
        }}
      >
        <Stack sx={{ flexDirection: "column" }} spacing={2}>
          <Box
            sx={{
              background: `url(${Logo})`,
              height: "50px",
              width: "50px",
              backgroundSize: "cover",
            }}
            onClick={() => navigate("/dashboard")}
          />

          {!expand ? (
            <>
              <NavItem Vector={Vector1} />
              <NavItem Vector={Vector2} />
              <NavItem Vector={Vector3} />
            </>
          ) : (
            <Stack container spacing={2}>
              {/* onclick */}

              <NavExpand
                msg="New Agreement"
                navigateTO={navigateTo}
                Vector={Vector1}
              />
              <NavExpand
                msg="Monthly Payments"
                navigateTO="adminLogin"
                Vector={Vector2}
              />
              <NavExpand msg="Renewal" Vector={Vector3} />
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default HamburgerMenu;
