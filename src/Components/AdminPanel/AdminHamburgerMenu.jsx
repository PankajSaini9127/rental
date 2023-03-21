import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../../assest/pic/Dashboard/logo1 2.png";

import "../../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { VectorLogout, VectorUser } from "../Vector";
import { NavExpand, NavItem } from "../StyleComponents/HamburgerStyled";

import MenuIcon from '@mui/icons-material/Menu';

function AdminHamburgerMenu() {
  const [expand, setExpand] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px"}}
        className={expand ? "HeroSectionMenu" : ""}
        // onMou
        
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

          {!expand ? (
            <>
              <NavItem Vector={VectorUser} navigateTO="userManagement"/>
              <NavItem Vector={VectorLogout}/>
              </>
          ) : (
            <Stack container  spacing={2} >
              {/* onclick */}
             
             <NavExpand msg="User"  Vector={VectorUser} NavItem={NavItem}/>
             <NavExpand msg="LogOut" navigateTO="" Vector={VectorLogout} NavItem={NavItem}/>

            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default AdminHamburgerMenu;
