import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

function AddUserCheckBox({ handleChange, disable, value,setDisable }) {
  const { manager, srManager, admin, operations, finance, bhu } = disable;



// function handleChange (e){
// setDisable(old=>({
//   [e.target.name]:e.target.checked
// }))


// }






  return (
    <>
      <Grid
        item
        md={8}
        xs={6}
        sx={{ mb: "0px !important", "@media(max-width:900px)": { my: 1 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"Admin"} value={disable['Admin']}/>}
              onChange={handleChange}
              value={"Admin"}
              disabled={admin ? true : false}
              label="Admin"
              labelPlacement="end"
              
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"Manager"} value={disable['Manager']}/>}
              onChange={handleChange}
              disabled={manager ? true : false}
              label="Manager"
              labelPlacement="end"
              value={"Manager"}
              
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  name={"Senior_Manager"} value={disable['Senior_Manager']}/>}
              onChange={handleChange}
              disabled={srManager ? true : false}
              label="Senior Manager"
              value={"Senior Manager"}
              labelPlacement="end"
              
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"Operations"}  value={disable['Operations']}/>}
              onChange={handleChange}
              name={"role"}
              label="Operations"
              disabled={operations ? true : false}
              value="Operations"
              labelPlacement="end"
              
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"Finance"}  value={disable['Finance']}/>}
              name={"role"}
              onChange={handleChange}
              disabled={finance ? true : false}
              label="Finance"
              value="Finance"
              labelPlacement="end"
             
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"BHU"} value={disable['BHU']}/>}
              name={"role"}
              onChange={handleChange}
              disabled={bhu ? true : false}
              label="BHU"
              value={"BHU"}
              labelPlacement="end"
              
            />
          </FormGroup>
        </Box>
      </Grid>
    </>
  );
}

export default AddUserCheckBox;
