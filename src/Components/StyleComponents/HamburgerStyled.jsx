import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavExpand = ({msg, navigateTO,Vector,onClick})=>{

    const navigate = useNavigate()
    
    return(
      <Grid
      item
      container
      
        className="ActiveMenu"
        sx={{
          height: "50px",
          width: "250px",
          position: "relative",
          flexDirection:"row",
          alignItems:"center",
          cursor:'pointer',
          '@media(max-width:900px)':{width:'180px'}
        }}
        onClick={()=>{onClick()}}
      >
  
       <Box sx={{width:"50px"}}><Vector/></Box>
  
        <Typography variant="body1" component={'span'} color="var(--main-color)" className="menuItem"
        sx={{
          textAlign: "center",
      fontWeight: "500",
      lineHeight: "24px",
      fontSize: "18px",
      '@media(max-width:900px)':{fontSize:"12px",lineHeight:"15px"}
          
        }}
        >
         {msg}
        </Typography>
      </Grid>
    )
  }
  
  const NavItem = ({Vector,onClick})=>{
    return(
              <Box sx={{cursor:'pointer'}} onClick={onClick}>
                  <Vector/>
                  </Box>
    )
  }


export {NavExpand,NavItem}