import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../../assest/pic/Dashboard/logo1 2.png";

import "../../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { VectorLogout, VectorUser } from "../Vector";
import { NavExpand, NavItem } from "../StyleComponents/HamburgerStyled";

import MenuIcon from "@mui/icons-material/Menu";

function AdminHamburgerMenu() {
  const [expand, setExpand] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px" }}
        className={expand ? "HeroSectionMenu" : ""}
        // onMou
      >
        <Stack sx={{ flexDirection: "column" }} spacing={2}>
          <Box
            sx={{
              height: "50px",
              width: "50px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <IconButton color="primary" onClick={() => setExpand(!expand)}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              background: `url(${Logo})`,
              height: "50px",
              width: "50px",
              backgroundSize: "cover",
            }}
            onClick={() => navigate("/userDashboard")}
          />

          {!expand ? (
            <>
            {/* yashwant */}
              <NavItem Vector={VectorUser} 
            onClick={() => navigate("/userDashboard")}
               />
              <NavItem Vector={VectorLogout} navigateTO="" />
            </>
          ) : (
            <Stack container spacing={2}>
              {/* onclick */}
              <NavExpand
                msg="User"
                navigateTO={"userManagement"}
                Vector={VectorUser}
                NavItem={NavItem}
                onClick={() => navigate("/userManagement")}
              />
              <NavExpand
                msg="LogOut"
                // navigateTO=""
                Vector={VectorLogout}
                navigateTO="userManagement"

              />
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default AdminHamburgerMenu;
