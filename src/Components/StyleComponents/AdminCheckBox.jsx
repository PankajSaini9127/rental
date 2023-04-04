import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function AdminCheckBox({ handleChange,disable, value,error }) {
  const {Manager,Senior_Manager,Admin,Finance,BHU,Operations} = disable
  return (
    <>
      <Grid
        item
        md={8}
        xs={6}
      >
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

        <FormGroup>
            <FormControlLabel
            name={"role"}
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              value={'Admin'}
              disabled={Admin?true:false}
              label="Admin"
              labelPlacement="end"
              checked={ value?value.includes('Admin')?true:false: null}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  />}
              onChange={handleChange}
              name={"role"}
              disabled={Manager?true:false}
              label="Manager"
              labelPlacement="end"
              value={'Manager'}
              checked={ value? value.includes('Manager')?true:false :null }
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  />}
              onChange={handleChange}
              name={"role"}
              disabled={Senior_Manager?true:false}
              label="Senior Manager"
              value={'Senior_Manager'}
              labelPlacement="end"
              checked={value? value.includes('Senior_Manager')?true:false:null}
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              name={"role"}
              label="Operations"
              disabled={Operations?true:false}
              value="Operations"
              labelPlacement="end"
              checked={ value? value.includes('Operations')?true:false: null}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              name={"role"}
              onChange={handleChange}
              disabled={Finance?true:false}
              label="Finance"
              value="Finance"
              labelPlacement="end"
              checked={value? value.includes('Finance')?true:false:null}
            />

          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              name={"role"}
              onChange={handleChange}
              disabled={BHU?true:false}
              label="BHU"
              value={'BHU'}
              labelPlacement="end"
              checked={ value? value.includes('BHU')?true:false:null}
            />
          </FormGroup>

          { error? <Typography variant="body1" color="red" ml={1} mt={3}>{error}</Typography>:null}
          
        </Box>
      </Grid>
    </>
  );
}

export default AdminCheckBox;
