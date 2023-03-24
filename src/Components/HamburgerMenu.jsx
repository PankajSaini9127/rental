import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../assest/pic/Dashboard/logo1 2.png";

import "../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { Vector1, Vector2, Vector3, VectorLogout } from "./Vector";
import { NavExpand, NavItem } from "./StyleComponents/HamburgerStyled";

import MenuIcon from '@mui/icons-material/Menu';

function HamburgerMenu({navigateTo,navigate2}) {
  const [expand, setExpand] = useState(false);

   const navigate = useNavigate()

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px" }}
        className={expand ? "HeroSectionMenu" : ""}
        // onMouseEnter={() => setExpand(true)}
        // onMouseLeave={() => {
        //   setExpand(false);
        // }}
      >
        <Stack sx={{ flexDirection: "column" }} spacing={2}>

        <Box
            sx={{
              height: "50px",
              width: "50px",
              display:'grid',
              placeItems:'center'
            }} 
          
          >
            <IconButton color="primary" onClick={() => setExpand(!expand)} ><MenuIcon/></IconButton>
          </Box>

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
              <NavItem Vector={Vector1} navigateTO={navigateTo}/>
              <NavItem Vector={Vector2} navigateTO={"monthly-payment"}/>
              <NavItem Vector={Vector3} navigateTO={"renewal"}/>
              <NavItem Vector={VectorLogout} navigateTO={''} />
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
                navigateTO={'monthly-payment'}
                Vector={Vector2}
              />
              <NavExpand msg="Renewal" Vector={Vector3} navigateTO={'renewal'}/>
              <NavExpand msg="Log-out" Vector={VectorLogout} navigateTO={''}/>
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default HamburgerMenu;
