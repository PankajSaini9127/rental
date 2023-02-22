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
    container
    
      className="ActiveMenu"
      sx={{
        height: "50px",
        width: "250px",
        borderRadius: "18px",
        position: "relative",
        flexDirection:"row",
        alignItems:"center",
      }}
      onClick={() => {
        navigate(`/${navigateTO}`);
      }}
    >

     <Box sx={{width:"50px"}}><Vector/></Box>

      <Typography variant="body1" component={'span'} color="#03C1F3" className="menuItem"
      sx={{
        textAlign: "center",
    fontWeight: "500",
    lineHeight: "24px",
    fontSize: "18px",
    '@media(ma-width:900px)':{fontSize:"8px",lineHeight:"10px"}
        
      }}
      >
       {msg}
      </Typography>
    </Grid>
  )
}

const NavItem = ({Vector})=>{
  return(
   
                <Vector />
  )
}

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "15px"}}
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
             
             <NavExpand msg="New Agreement" navigateTO="newAgreement" Vector={Vector1} NavItem={NavItem}/>
             <NavExpand msg="Monthly Payments" navigateTO="listing" Vector={Vector2}/>
             <NavExpand msg="Renewal" Vector={Vector3}/>

            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default HamburgerMenu;
