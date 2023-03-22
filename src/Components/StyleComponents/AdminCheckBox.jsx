import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

function AdminCheckBox({ handleChange,disable }) {
    const {manager,srManager,admin,operations,finance,bhu} = disable
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
              value={'Admin'}
              disabled={admin?true:false}
              label="Admin"
              labelPlacement="end"
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
            />
          </FormGroup>

          
        </Box>
      </Grid>
    </>
  );
}

export default AdminCheckBox;
