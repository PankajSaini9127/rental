import { Box, Grid, IconButton, Stack} from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../assest/pic/Dashboard/logo1 2.png";

import "../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { Vector1, Vector2, Vector3, VectorLogout } from "./Vector";
import { NavExpand, NavItem } from "./StyleComponents/HamburgerStyled";

import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";

function HamburgerMenu({handleListing,navigateHome,monthlyRent,renewal,monthlyBtn}) {
  const [expand, setExpand] = useState(false);

  const dispatch = useDispatch()

   const navigate = useNavigate()


   // logout function
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
              width: "55px",
              backgroundSize: "cover",
            }}
            onClick={() => navigate(`/${navigateHome}`)}
          />
          

          {!expand ? (
            <>
              <NavItem Vector={Vector1} onClick={handleListing}/>
              {
                monthlyBtn &&
                <>
                <NavItem Vector={Vector2} onClick={monthlyRent}/>
               <NavItem Vector={Vector3} onClick={renewal}/>
               </>
              }
              
              <NavItem Vector={VectorLogout} onClick={logout}/>
            </>
          ) : (
            <Stack container spacing={2}>
              {/* onclick */}

              <NavExpand
                msg="New Agreement"
                onClick={handleListing}
                Vector={Vector1}
              />
              {
                monthlyBtn && <>
                <NavExpand
                msg="Monthly Payments"
                onClick={monthlyRent}
                Vector={Vector2}
              />
              <NavExpand msg="Renewal" Vector={Vector3}  onClick={renewal}/>
                </>
              }
              
              <NavExpand msg="Logout" Vector={VectorLogout}  onClick={logout}/>
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default HamburgerMenu;