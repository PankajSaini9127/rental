import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

function AdminCheckBox({ handleChange,disable, value }) {
    const {manager,srManager,admin,operations,finance,bhu} = disable
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
            name={"role"}
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              value={'Admin'}
              disabled={admin?true:false}
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
              disabled={manager?true:false}
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
              disabled={srManager?true:false}
              label="Senior Manager"
              value={'Senior Manager'}
              labelPlacement="end"
              checked={value? value.includes('Senior Manager')?true:false:null}
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              name={"role"}
              label="Operations"
              disabled={operations?true:false}
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
              disabled={finance?true:false}
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
              disabled={bhu?true:false}
              label="BHU"
              value={'BHU'}
              labelPlacement="end"
              checked={ value? value.includes('BHU')?true:false:null}
            />
          </FormGroup>

          
        </Box>
      </Grid>
    </>
  );
}

export default AdminCheckBox;
