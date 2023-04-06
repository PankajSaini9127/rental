import { Box, Grid, Stack } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { meta } from '../../Services/Services'
import { DashboardItem, MyHeader } from '../StyledComponent'
import AdminHamburgerMenu from './AdminHamburgerMenu'
import HamburgerMenu from '../HamburgerMenu'
import { useNavigate } from 'react-router-dom'
 

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
  
const navigate = useNavigate()

  return (<>
       
    <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
    {/* <AdminHamburgerMenu
        navigateListing={'/userManagement'}
        navigateHome={'/userDashboard'}
        /> */}

<HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={() => navigate("/listing")}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          // monthlyBtn="true"
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