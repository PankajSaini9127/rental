import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import { DashboardItem, MyHeader } from '../StyledComponent'
import AdminHamburgerMenu from './AdminHamburgerMenu'

function UserDashboard() {
  return (<>
        <MyHeader>User Dashboard</MyHeader>
    <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu/>

        <Box sx={{flexGrow:1}}>


<Grid container sx={{justifyContent:"center"}}>
  <Grid item md={10}>
        <Grid container spacing={3}>
            <DashboardItem service="Total Sr Manager" value="5" />
            <DashboardItem service="Total Manager" value="5" />
            <DashboardItem service="Total Operation" value="5" />
          </Grid>
          </Grid>
          </Grid>
        </Box>
        </Stack>
        </>
  )
}

export default UserDashboard