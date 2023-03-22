import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

function AdminCheckBox({ handleChange,disable }) {
    const {manager,srManager} = disable
  return (
    <>
      <Grid
        item
        md={4}
        xs={6}
        sx={{ mb: "0px !important", "@media(max-width:900px)": { my: 1 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

        <FormGroup>
            <FormControlLabel
            name={"role"}
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              disabled={manager?true:false}
              value={'Admin'}
              label="Admin"
              labelPlacement="end"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  />}
              onChange={handleChange}
              name={"role"}
              label="Manager"
              labelPlacement="end"
              value={'Manager'}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  />}
              onChange={handleChange}
              name={"role"}
              disabled={manager?true:false}
              label="Senior Manager"
              value={'Senior Manager'}
              labelPlacement="end"
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              onChange={handleChange}
              name={"role"}
              disabled={manager?true:false}
              label="Operations"
              value="Operations"
              labelPlacement="end"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              name={"role"}
              onChange={handleChange}
              disabled={manager?true:false}
              label="Finance"
              value="Finance"
              labelPlacement="end"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              name={"role"}
              onChange={handleChange}
              disabled={manager?true:false}
              label="BHU"
              value={'BHU'}
              labelPlacement="end"
            />
          </FormGroup>

          
        </Box>
      </Grid>
    </>
  );
}

export default AdminCheckBox;
