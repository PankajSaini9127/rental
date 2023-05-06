import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { meta } from "../../Services/Services";
import { DashboardItem, MyHeader } from "../StyledComponent";
import HamburgerMenu from "../HamburgerMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HamburgerAdmin from "./HamburgerAdmin";

function UserDashboard() {
  const [metaData, setMeta] = useState({});
  const {
    auth: { role },
  } = useSelector((s) => s);

  useEffect(() => {
    getMetaData();
  }, []);

  async function getMetaData() {
    let response = await meta();

    if (response) {
      setMeta(response.data);
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
 
     <HamburgerAdmin/>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid xs={12}>
              {" "}
              <MyHeader>Rental Management System</MyHeader>
            </Grid>
            <Grid item md={10} sx={{ mt: 4 }}>
              <Grid container spacing={4}>
               
                <DashboardItem
                  service="Total Operation"
                  value={metaData.Operations}
                  onClick={()=>navigate("/userManagement/Operation")}
                />
                <DashboardItem 
                service="Total BUH" 
                value={metaData.BHU} 
                onClick={()=>navigate("/userManagement/BUH")}
                />
                <DashboardItem
                  service="Total Finance"
                  value={metaData.Finance}
                  onClick={()=>navigate("/userManagement/Finance")}
                />
                 <DashboardItem
                  service="Total Sr Manager"
                  value={metaData.Senior_Manager}
                  onClick={()=>navigate("/userManagement/Senior_Manager")}
                />
                <DashboardItem
                  service="Total Manager"
                  value={metaData.Manager}
                  onClick={()=>navigate("/userManagement/Manager")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default UserDashboard;
