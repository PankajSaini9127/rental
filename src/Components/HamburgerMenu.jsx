import { Box, Grid, Stack} from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../assest/pic/Dashboard/logo1 2.png";

import "../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { Vector1, Vector2, Vector3, VectorLogout, VectorUser } from "./Vector";
import { NavExpand, NavItem } from "./StyleComponents/HamburgerStyled";

import Dashboard from "../assest/pic/Dashboard/chart.png";
import { useDispatch, useSelector } from "react-redux";

function HamburgerMenu({handleListing,navigateHome,monthlyRent,renewal,monthlyBtn}) {
  const [expand, setExpand] = useState(false);

const {auth} = useSelector(s=>s)

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
              background: `url(${Logo})`,
              height: "66px",
              width: "89px",
              backgroundSize: "cover",
            }}
            onClick={() => navigate(`/${navigateHome}`)}
          />

<Box sx={{display: "grid",placeItems: "center",width:'89px'}}>
          <Box
            sx={{
              background: `url(${Dashboard})`,
              backgroundSize: "cover",
              height: "45px",
              width: "45px",
              cursor:'pointer'
            }}
            onClick={() => navigate(navigateHome)}
            />
          </Box>

        
          

          {!expand ? (
            <>
            {
              auth.role.includes("Admin") && <NavItem
              Vector={VectorUser}
              onClick={() => navigate('/userDashboard')}
            />
            }
             
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
                msg="Users"
                Vector={VectorUser}
                NavItem={NavItem}
                onClick={() => navigate(`/userDashboard`)}
              />

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