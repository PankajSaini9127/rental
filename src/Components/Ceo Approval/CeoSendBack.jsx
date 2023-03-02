import { Box, Button, Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HamburgerMenu from '../HamburgerMenu'
import { DataFieldStyle, YearField } from '../StyleComponents/Rental'
import { MyHeader } from '../StyledComponent'
import DialogBoxSBM from '../RentalPortal/DialogBoxSBM'






function CeoSendBack() {

  const navigate = useNavigate()

  const [open, setOpen] = useState(true)

  const handleClose = ()=>{
       setOpen(false)
  }

  const handleReject = ()=>{
    setOpen(true)
  }

const handleApproval =()=>{
    navigate('/financeTeamApproval')
}


  return (
    <>
    <DialogBoxSBM open={open} handleClose={handleClose} sendBack={'send back to manager'} navigate={''}/>
     <Stack sx={{ flexDirection: "row" }}>
        <HamburgerMenu />

        <Box sx={{ flexGrow: 1 }}>

          <MyHeader>Rental Aggrement Pending For Approval</MyHeader>


          <Grid container sx={{ justifyContent: "center",mt:2 }}>
          <Grid item md={8}>
              <Grid container spacing={1}>
               
                <DataFieldStyle field={"code"} value={"123456"} />
                <DataFieldStyle field={"name of leasse"} value={"ABC"} />
                <DataFieldStyle field={"state"} value={"Rajsthan"} />
                <DataFieldStyle field={"city"} value={"Jodhpur"} />
                <DataFieldStyle field={"location"} value={"Jodhpur"} />
                <DataFieldStyle field={"pincode"} value={"123456"} />
                <DataFieldStyle
                  field={"address"}
                  value={"abc, Nehru park Colony Sardarpura"}
                />
                <DataFieldStyle field={"mobile number"} value={"1234567890"} />
                <DataFieldStyle
                  field={"alternate number"}
                  value={"1234567890"}
                />
                <DataFieldStyle field={"email"} value={"abc@test.com"} />
                <DataFieldStyle
                  field={"lock in year (if Applicable)"}
                  value={"No"}
                />
                <DataFieldStyle field={"notice period in month"} value={"2"} />
                <DataFieldStyle field={"deposite amount"} value={"10000"} />
                <DataFieldStyle field={"monthaly rental"} value={"3000"} />

                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <YearField year={"Year 1"} amount={"3000"} />
                  <YearField year={"Year 2"} amount={"3000"} />
                  <YearField year={"Year 3"} amount={"3000"} />
                  <YearField year={"Year 4"} amount={"3000"} />
                  <YearField year={"Year 5"} amount={"3000"} />
                  <YearField year={"Year 6"} amount={"3000"} />
                </Grid>
              </Grid>
            </Grid>


{/* Buttons start here*/}

<Grid item md={6}  sx={{ mt: 4, mb: 5 }}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={11}>
                  <Button
                    variant="contained"
                    sx={{
                      height: "65px",
                      borderRadius: "12px",
                      backgroundColor: "primary",
                      width: "100%",
                      color: "#FFFFFF",
                      textTransform: "capitalize",
                      fontSize: "20px",
                    }}
                    onClick={handleApproval}
                  >
                    Approved
                  </Button>
                </Grid>
                <Grid item md={6} xs={11}>
                  <Button
                    variant="outlined"
                    sx={{
                      height: "65px",
                      borderRadius: "12px",
                      width: "100%",
                      color: "#03C1F3",
                      textTransform: "capitalize",
                      fontSize: "20px",
                    }}
                    onClick={handleReject}
                  >
                    Rejected
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* buttons end here */}


          </Grid>

          </Box>
          </Stack>
    </>
  )
}

export default CeoSendBack