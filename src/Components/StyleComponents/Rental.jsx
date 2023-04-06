import { Grid, Typography } from "@mui/material";

import { saveAs } from "file-saver";

const DataFieldStyle = ({ field, value ,href,name ,bold, cursor}) => {
    const typographyStyle = {
      textTransform: "capitalize",
      color:"var(--main-color)",
      fontWeight: "600",
      // "@media(max-width:900px)": { fontSize: "14px" },
    };

    function handleClick(){
      saveAs(href, name)
    }
    return (
      <Grid item md={3} xs={6} sx={{p:0,overflow:"auto"}}>
        <Typography variant="h6" sx={typographyStyle}>
          {" "}
          {field}
        </Typography>
        <Typography variant="body2" sx={{color : 'black', cursor:(cursor && "pointer")}} onClick={handleClick} fontWeight={bold?"600":''}>
          {" "}
          {value}
        </Typography>
      </Grid>
    );
  };
  
  const YearField = ({ year, amount}) => {
  
    const fieldStyle ={fontSize:'17px',color:"var(--main-color)",
    fontWeight: "600",
  
  }

 
    return (
      <Grid item md={2} xs={4}>
        <Typography variant="body1" 
         sx={fieldStyle}
        >
          {year}
        </Typography>
        <Typography variant="body1" sx={{colot:'black' }}  >
          {amount}
        </Typography>
      </Grid>
    );
  };


  export {DataFieldStyle, YearField}