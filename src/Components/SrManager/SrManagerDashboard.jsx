import { Grid } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import HamburgerMenu from '../HamburgerMenu'
import { DashboardItem, MyHeader } from '../StyledComponent'



const data = [ 
    {service:"Total Approval Pending", value:10},
    {service:"Send Back To Manager", value:5},
    {service:"Approved Agreement", value:5},
    {service:"Rejected Agreements", value:0},
    {service:"Renewal Agreements", value:4}
  ]

function SrManagerDashboard() {
  return (
    <>
    <MyHeader>Dashboard</MyHeader>

<Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
  <HamburgerMenu  navigateTo={'srManagerListing'}/>

  {/* dashboard content */}
  <Grid container sx={{ justifyContent: "center" }}>
    <Grid item xs={10}>
      <Grid
        container
        spacing={4}
      >
      {
        data.map((item,index)=>{
          return(
            <DashboardItem service={item.service} value={item.value} key={index}/>
          )
        })
      }
      </Grid>
    </Grid>
  </Grid>
</Stack>
    </>
  )
}

export default SrManagerDashboard