import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader } from "../StyledComponent";


const data =[
  {field:'code',value:'123456'},
  {field:'name of leese',value:'ABC'},
  {field:'state',value:'Rajsthan'},
  {field:'city',value:'Jodhpur'},
  {field:'location',value:'Jodhpur'},
  {field:'pincode',value:'123546'},
  {field:'address',value:'ABC Nehru colony sardarpura jodhpur'},
  {field:'aadhar number',value:'123456789101'},
  {field:'pan number',value:'123456'},
  {field:'gst number',value:'214587228545'},
  {field:'mobile number',value:'12345678910'},
  {field:'alternate mobile',value:'12345678901'},
  {field:'email',value:'bitwit@test.com'},
  {field:'lock in year(if applicable)',value:'no'},
  {field:'notice period in month',value:'2'},
  {field:'deposite amount',value:'11000'},
  {field:'monthly rental',value:'1500'},
]

const year = [
  {year:'Year 1',amount:'3000'},
  {year:'Year 2',amount:'3000'},
  {year:'Year 3',amount:'3000'},
  {year:'Year 4',amount:'3000'},
  {year:'Year 5',amount:'3000'},
  {year:'Year 6',amount:'3000'},
]

const bankDetail = [
  {field:'bank name',value:'ABCD Bank'},
  {field:'benicificary name',value:'john deo'},
  {field:'Bank A/C number ',value:'111111111111'},
  {field:'Bank IFSC Code',value:'123456'},
]

const documentView = [
  'aadhar card',
  'GST Certificate',
  'pan card',
  'draft agreement',
  'electricity bill',
   'cencil bank cheque',
   'maintaince bill',
   'POA',
   'Property tax receipt',
   'noc (if multiple owner)'

 ] 

const DocumentView = ({ title }) => {
  return (
    <Grid item xs={6}>
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"primary"}
        textTransform={"capitalize"}
        sx={{'@media(max-width:900px)':{fontSize:'18px'}}}
      >
        {" "}
        {title}
      </Typography>
      <Box
        sx={{
          height: "150px",
          border: "1px solid #03C1F3",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            color: "rgba(16, 99, 173, 0.47)",
            height: "100%",
            width: "100%",
          }}
        >
          view/Download
        </Button>
      </Box>
    </Grid>
  );
};

const Heading = ({ heading }) => {
  return (
    <Grid item xs={12} sx={{ mt: 6, mb: 2 }}>
      <Typography variant="body1" fontSize={"25px"} color={"primary"}>
        {heading}
      </Typography>
    </Grid>
  );
};

function AgreementApproval() {

  const navigate = useNavigate()

  const handleCeoSend = ()=>{
     
  }


  const handleSendManager = ()=>{
    navigate('/pendingApproval')
  }

  return (
    <>
      <Stack sx={{ flexDirection: "row" }}>
        <HamburgerMenu />

        <Box sx={{ flexGrow: 1 }}>

          <MyHeader>New Agreement Approval</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>
            {/* Basic Details */}
            <Grid item md={10}>
              <Grid container spacing={2}>
              {
                    data.map((item,i)=>{
                       return <DataFieldStyle field={item.field} value={item.value} key={i}/>
                    })
                }


                <Grid container spacing={1} sx={{ mt: 6 }}>

                  {
                    year.map((item,i)=>{
                      return <YearField year={item.year} amount={item.amount} key={i}/>
                    })
                  }
                </Grid>
              </Grid>
            </Grid>

            {/* Bank Details start here */}
            <Heading heading={"Bank Details"} />

            <Grid item md={10}>
              <Grid container spacing={2}>
      
                 {
                  bankDetail.map((item,i)=>{
                    return <DataFieldStyle field={item.field} value={item.value} />
                  })
                 }
              </Grid>
            </Grid>

            {/* Bank Details Ends here */}

            {/* Document Section start here */}
            <Heading heading={"Document Download"} />

            <Grid item md={8}>
              <Grid container spacing={2}>
                  {
                    documentView.map((item,i)=>{
                      return <DocumentView title={item} />
                    })
                  }
                  
              </Grid>
            </Grid>

            {/* document section ends here */}

            {/* Buttons start here*/}

            <Grid item md={6}  sx={{ mt: 4, mb: 2 }}>
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
                    onClick={handleSendManager}
                  >
                    Submit To Manager
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
                    onClick={handleCeoSend}
                  >
                    Send For ceo Approval
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* buttons end here */}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default AgreementApproval;
