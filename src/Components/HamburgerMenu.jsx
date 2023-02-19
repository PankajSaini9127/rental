import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../assest/pic/Dashboard/logo1 2.png";
import Rectangle from "../assest/pic/Dashboard/Rectangle 34.png";

import "../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { Vector1, Vector2, Vector3 } from "./Vector";

function HamburgerMenu() {
  const [expand, setExpand] = useState(false);

  const navigate = useNavigate();

const NavExpand = ({msg, navigateTO,Vector})=>{
  return(
    <Grid
    item
      className="ActiveMenu"
      sx={{
        height: "50px",
        width: "250px",
        borderRadius: "18px",
        position: "relative",
      }}
      onClick={() => {
        navigate(`/${navigateTO}`);
      }}
    >
     <Vector expand={expand}/>
      <Typography variant="body1" color="#03C1F3" className="menuItem" >
       {msg}
      </Typography>
    </Grid>
  )
}

const NavItem = ({Vector})=>{
  return(
    <Box
                sx={{
                  background: `url(${Rectangle})`,
                  height: "50px",
                  width: "50px",
                  backgroundSize: "cover",
                  position: "relative",
                }}
              >
                <Vector expand={expand}/>
          </Box>
  )
}

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "15px", minWidth: "50px" }}
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
            onClick={()=>navigate('/dashboard')}
          />

          {!expand ? (
            <>
              <NavItem Vector={Vector1}/>
              <NavItem Vector={Vector2}/>
              <NavItem Vector={Vector3}/>
            </>
          ) : (
            <Stack container  spacing={2} >
              {/* onclick */}
             
             <NavExpand msg="New Agreement" navigateTO="newAgreement" Vector={Vector1}/>
             <NavExpand msg="Monthly Payments " navigateTO="listing" Vector={Vector2}/>
             <NavExpand msg="Renewal" Vector={Vector3}/>

            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default HamburgerMenu;
