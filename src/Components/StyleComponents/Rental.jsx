import { Grid, Typography } from "@mui/material";

const DataFieldStyle = ({ field, value }) => {
    const typographyStyle = {
      textTransform: "capitalize",
      color: "#03C1F3",
      fontSize: "20px",
      "@media(max-width:900px)": { fontSize: "18px" },
    };
    return (
      <Grid item md={4} xs={6}>
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
  
    const fieldStyle ={fontSize:'20px',color:'#03C1F3','@media(max-width:900px)':{fontSize:'18px'}}
    return (
      <Grid item md={1} xs={4}>
        <Typography variant="body1" 
         sx={fieldStyle}
        >
          {" "}
          {year}
        </Typography>
        <Typography variant="body1" sx={fieldStyle}>
          {" "}
          {amount}
        </Typography>
      </Grid>
    );
  };


  export {DataFieldStyle, YearField}