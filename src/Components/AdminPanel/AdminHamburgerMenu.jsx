import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../../assest/pic/Dashboard/logo1 2.png";

import "../../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { VectorLogout, VectorUser } from "../Vector";
import { NavExpand, NavItem } from "../StyleComponents/HamburgerStyled";

function AdminHamburgerMenu() {
  const [expand, setExpand] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px"}}
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
            onClick={()=>navigate('/userDashboard')}
          />

          {!expand ? (
            <>
              <NavItem Vector={VectorUser}/>
              <NavItem Vector={VectorLogout}/>
              </>
          ) : (
            <Stack container  spacing={2} >
              {/* onclick */}
             
             <NavExpand msg="User" navigateTO="userManagement" Vector={VectorUser} NavItem={NavItem}/>
             <NavExpand msg="LogOut" navigateTO="" Vector={VectorLogout} NavItem={NavItem}/>

            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default AdminHamburgerMenu;
