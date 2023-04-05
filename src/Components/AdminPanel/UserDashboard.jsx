import { Box, Grid, Stack } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { meta } from '../../Services/Services'
import { DashboardItem, MyHeader } from '../StyledComponent'
import AdminHamburgerMenu from './AdminHamburgerMenu'
 

function UserDashboard() {

  const [metaData,setMeta] = useState({})

  useEffect(() => {
    getMetaData();
  }, []);

  async function getMetaData(){
    let response = await meta()

    if(response)
    {
      setMeta(response.data)
    }

  }
  

  return (<>
       
    <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
    <AdminHamburgerMenu
        navigateListing={'/userManagement'}
        navigateHome={'/userDashboard'}
        />

        <Box sx={{flexGrow:1}}>

<Grid container sx={{justifyContent:"center"}}>
  <Grid xs={12}> <MyHeader>User Dashboard</MyHeader></Grid>
  <Grid item md={10} sx={{mt:4}}>
        <Grid container spacing={4}>
            <DashboardItem service="Total Sr Manager" value={metaData.Senior_Manager} />
            <DashboardItem service="Total Manager" value={metaData.Manager} />
            <DashboardItem service="Total Operation" value={metaData.Operations} />
            <DashboardItem service="Total BHU" value={metaData.BHU} />
            <DashboardItem service="Total Finance" value={metaData.Finance} />
          </Grid>
          </Grid>
          </Grid>
        </Box>
        </Stack>
        </>
  )
}

export default UserDashboard