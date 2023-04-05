import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React from "react";

function AddUserCheckBox({ handleChange,disable, value }) {
    const {Manager,Senior_Manager,Admin,Finance,BUH,Operations} = disable
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
              disabled={Admin?true:false}
              label="Admin"
              labelPlacement="end"
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
                          />

          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name={"role"} />}
              name={"role"}
              onChange={handleChange}
              disabled={BUH?true:false}
              label="BUH"
              value={'BUH'}
              labelPlacement="end"
                       />
          </FormGroup>

          
        </Box>
      </Grid>
    </>
  );
}

export default AddUserCheckBox;
