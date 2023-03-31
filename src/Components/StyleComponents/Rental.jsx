import { Grid, Typography } from "@mui/material";

const DataFieldStyle = ({ field, value }) => {
    const typographyStyle = {
      textTransform: "capitalize",
      color:"var(--main-color)",
      fontSize: "17px",
      "@media(max-width:900px)": { fontSize: "14px" },
    };
    return (
      <Grid item md={3} xs={6} sx={{p:0}}>
        <Typography variant="body1" sx={typographyStyle}>
          {" "}
          {field}
        </Typography>
        <Typography variant="body1" sx={typographyStyle}>
          {" "}
          {value}
        </Typography>
      </Grid>
    );
  };
  
  const YearField = ({ year, amount }) => {
  
    const fieldStyle ={fontSize:'17px',color:"var(--main-color)",'@media(max-width:900px)':{fontSize:'14px'}}
    return (
      <Grid item md={2} xs={4}>
        <Typography variant="body1" 
         sx={fieldStyle}
        >
          {year}
        </Typography>
        <Typography variant="body1" sx={fieldStyle}>
          {amount}
        </Typography>
      </Grid>
    );
  };


  export {DataFieldStyle, YearField}