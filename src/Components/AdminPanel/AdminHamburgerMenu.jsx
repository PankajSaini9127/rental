import { Box, Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../../assest/pic/Dashboard/logo1 2.png";

import "../../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { VectorLogout, VectorUser } from "../Vector";
import { NavExpand, NavItem } from "../StyleComponents/HamburgerStyled";

import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";

function AdminHamburgerMenu({navigateListing,navigateHome}) {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  function logout (){
    localStorage.clear()
    dispatch({type :"LOGOUT"})
    navigate('/')
  } 

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
            onClick={() => navigate(navigateHome)}
          />

          {!expand ? (
            <>
              <NavItem
                Vector={VectorUser}
                onClick={() => navigate(`${navigateListing}`)}
              />
              <NavItem Vector={VectorLogout} onClick={logout}/>
            </>
          ) : (
            <Stack container spacing={2}>
              {/* onclick */}
              <NavExpand
                msg="Users"
                Vector={VectorUser}
                NavItem={NavItem}
                onClick={() => navigate(`${navigateListing}`)}
              />
              <NavExpand
                msg="LogOut"
                // navigateTO=""
                Vector={VectorLogout}
                onClick={logout}
              />
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default AdminHamburgerMenu;
