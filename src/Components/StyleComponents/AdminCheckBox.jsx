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
              value={'admin'}
              disabled={Admin?true:false}
              label="Admin"
              labelPlacement="end"
              checked={ value?value.includes('admin')?true:false: null}
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
              value={'manager'}
              checked={ value? value.includes('manager')?true:false :null }
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  />}
              onChange={handleChange}
              name={"role"}
              disabled={Senior_Manager?true:false}
              label="Senior Manager"
              value={'senior_manager'}
              labelPlacement="end"
              checked={value? value.includes('senior_manager')?true:false:null}
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              name={"role"}
              label="Operations"
              disabled={Operations?true:false}
              value="operations"
              labelPlacement="end"
              checked={ value? value.includes('operations')?true:false: null}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              name={"role"}
              onChange={handleChange}
              disabled={Finance?true:false}
              label="Finance"
              value="finance"
              labelPlacement="end"
              checked={value? value.includes('finance')?true:false:null}
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
              checked={ value? value.includes('bhu')?true:false:null}
            />
          </FormGroup>

          { error? <Typography variant="body1" color="red" ml={1} mt={3}>{error}</Typography>:null}
          
        </Box>
      </Grid>
    </>
  );
}

export default AdminCheckBox;
