import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader, TextFieldWrapper } from "../StyledComponent";
import { useEffect, useState } from "react";
import {
  get_agreement_id,
  send_back_to_manager,
} from "../../Services/Services";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import { useDispatch, useSelector } from "react-redux";

import { send_to_operations } from "../../Services/Services";

//download file
import { setAlert } from "../../store/action/action";

const Heading = ({ heading }) => {
  return (
    <Grid item xs={11} sx={{ mt: 6, mb: 2 }}>
      <Typography variant="body1" fontSize={"22px"} color={"primary"}>
        {heading}
      </Typography>
    </Grid>
  );
};

function SrManagerApproval() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const [sendBackMsg, setSendBackMsg] = useState("");


  const { auth } = useSelector((s) => s);

  const srm_id = auth.id;

  const dispatch = useDispatch();


  const getData = async (id) => {
    const agreement = await get_agreement_id(id);
    setAgreement(agreement.data.agreement);
    setIds(agreement.data.ids);
    setSendBackMsg(agreement.data.agreement[ids[0]].remark)
    console.log(agreement)
  };

  

  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = async (e) => {
    if(sendBackMsg.length <= 0){
      dispatch(
        setAlert({
          variant:'error',
          open: true,
          message: "Remark Required !.",
        })
      )
    }else{

    const response = await send_to_operations(
      { status: "Sent To Operations", bhu_id:srm_id,remark:sendBackMsg },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          vatiant: "success",
          open: true,
          message: "Approved And Sent To Operations",
        })
      );
      navigate('/BHUListing')
    } else {
      dispatch(
        setAlert({
          vatiant: "error",
          open: true,
          message: "Something went wrong! Please again later.",
        })
      );
    }
  }
  };

 //Send Back to manager
 async function handleSendBack() {
  if(sendBackMsg.length <= 0){
    dispatch(
      setAlert({
        variant:'error',
        open: true,
        message: "Remark Required !.",
      })
    )
  }else{
  const response = await send_back_to_manager(
    {
      status: "Sent Back Form BUH",
      remark: sendBackMsg,
    },
    id
  );
  if (response.data.success) {
    dispatch(
      setAlert({
        variant: "success",
        open: true,
        message: "Send back For Rectification",
      })
    );
    navigate('/BHUListing')
  } else {
    dispatch(
      setAlert({
        variant: "error",
        open: true,
        message: "Something went wrong! Please again later.",
      })
    );
  }
}
}

function getIncrement(rent,value,type){
  let incrementType ;
  rent = Number(rent)
  value= Number(value)
  if(type === "Percentage"){
    incrementType = parseInt(((value - rent) / rent) * 100)
    
    
  }else if(type === "Value"){
    incrementType = value-rent
    
  }
 return incrementType.toFixed(1)
}

  return (
    <>
      {ids.length > 0 && (
        <Stack sx={{ flexDirection: "row",mb:4 }}>
          <HamburgerMenu
            navigateHome={"BHUDashboard"}
            handleListing={() => navigate("/BHUListing")}
          />

          <Box sx={{ flexGrow: 1 }}>
            

            <Grid container sx={{ justifyContent: "center", mt: 2 }}>
              <Grid item xs={12}>
              <MyHeader>Rental Management System</MyHeader>
              </Grid>

            
              {/* Basic Details */}
              <Grid item md={10} sx={{mt:2}}>

              {
                agreement[ids[0]].status === "Deposited" &&
                <Grid container spacing={2}>
                        <DataFieldStyle
                          field={"UTR Number"}
                          value={agreement[ids[0]].utr_number}
                          href={agreement[ids[0]].final_agreement}
                          name={"Final Agreement"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"Final Agreement Date"}
                          value={agreement[ids[0]].final_agreement_date}
                        />
                        <DataFieldStyle
                          field={"Monthly Rent Date"}
                          value={agreement[ids[0]].rent_start_date}
                        />
                </Grid>
}

                <Grid container spacing={2}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement[ids[0]].state}
                  />
                  <DataFieldStyle
                    field={"location"}
                    value={agreement[ids[0]].location}
                  />
                  <DataFieldStyle
                    field={"city"}
                    value={agreement[ids[0]].city}
                  />
                  <DataFieldStyle
                    field={"pincode"}
                    value={agreement[ids[0]].pincode}
                  />
                  <DataFieldStyle
                    field={"address"}
                    value={agreement[ids[0]].address}
                  />
                  <DataFieldStyle
                    field={"area"}
                    value={agreement[ids[0]].area + " sq. ft"}
                  />
                  <DataFieldStyle
                    field={"lock in month"}
                    value={agreement[ids[0]].lockInYear}
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement[ids[0]].noticePeriod}
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement[ids[0]].deposit}
                  />
                  <DataFieldStyle
                    field={"monthly rental"}
                    value={agreement[ids[0]].monthlyRent}
                  />
                  <DataFieldStyle
                    field={"tenure"}
                    value={agreement[ids[0]].tenure}
                  />
                  {agreement[ids[0]].tenure !== "11 Month" && (
                    <>
                      <DataFieldStyle
                        field={"yearly Increment"}
                        value={agreement[ids[0]].yearlyIncrement}
                      />
                      <Grid container spacing={1} sx={{ mt: 6 }}>
                        <YearField
                          year={"Year 1"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          Increment={0}
                          amount={agreement[ids[0]].year1}
                        />
                        <YearField
                          year={"Year 2"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          amount={agreement[ids[0]].year2}
                          Increment={ getIncrement(agreement[ids[0]].monthlyRent,agreement[ids[0]].year2,agreement[ids[0]].yearlyIncrement)}
                        />
                        {(agreement[ids[0]].tenure === "3 Year" ||
                          agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 3"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year3}
                            Increment={ getIncrement(agreement[ids[0]].monthlyRent,agreement[ids[0]].year3,agreement[ids[0]].yearlyIncrement)}

                          />
                        )}
                        {(agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 4"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year4}
                            Increment={ getIncrement(agreement[ids[0]].monthlyRent,agreement[ids[0]].year4,agreement[ids[0]].yearlyIncrement)}
                          />
                        )}
                        {agreement[ids[0]].tenure === "5 Year" && (
                          <YearField
                            year={"Year 5"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year5}
                            Increment={ getIncrement(agreement[ids[0]].monthlyRent,agreement[ids[0]].year5,agreement[ids[0]].yearlyIncrement)}
                          />
                        )}
                      </Grid>
                    </>
                  )}

                  {/* {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <Grid container sx={{ mt: 3 }} spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid>
                        <DataFieldStyle
                          field={"name of leese"}
                          value={agreement[ids[0]].name[id]}
                        />
                        <DataFieldStyle
                          field={"aadhar number"}
                          value={agreement[ids[0]].aadharNo[0]}
                        />
                        <DataFieldStyle
                          field={"pan number"}
                          value={agreement[ids[0]].panNo[id]}
                        />
                        <DataFieldStyle
                          field={"gst number"}
                          value={agreement[ids[0]].gstNo[id]}
                        />
                        <DataFieldStyle
                          field={"mobile number"}
                          value={agreement[ids[0]].mobileNo[id]}
                        />
                        <DataFieldStyle
                          field={"alternate mobile"}
                          value={agreement[ids[0]].alternateMobile[id]}
                        />
                        <DataFieldStyle
                          field={"email"}
                          value={agreement[ids[0]].email[id]}
                        />
                        <DataFieldStyle
                          field={"Percentage Share"}
                          value={`${agreement[ids[0]].percentage[id]}%`}
                        />
                      </Grid>
                    )
                  )} */}
                </Grid>
              </Grid>

              
     
               {agreement[ids[0]].remark.length > 0 &&
               <Grid item xs={10} sx={{ mt: 5 }}>
                 <DataFieldStyle
                 field={"Remark"}
                 value={agreement[ids[0]].remark}
               />
               </Grid>
               }
             
              
                {agreement[ids[0]].status === "Sent To BUH" && (
                  <>
                   <Grid
                   item
                   container
                   xs={10}
                   sx={{ mt: 5 }}
                 >
                   <Grid item xs={8} className="textFieldWrapper">
                     <TextField
                       type="text"
                       multiline
                       rows={3}
                       fullWidth
                       variant="outlined"
                       label="Remark *"
                       placeholder="Remark *"
                       value={sendBackMsg}
                       onChange={(e) => setSendBackMsg(e.target.value)}
                     />
                   </Grid>
                 </Grid>
                 <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                  <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "space-evenly" }}
                  >
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
                          fontSize: "18px",
                        }}
                        onClick={handleSubmit}
                      >
                        Approve And Send To Operations
                      </Button>
                    </Grid>
                    <Grid item md={6} xs={11}>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "var(--main-color)",
                          height: "65px",
                          borderRadius: "12px",
                          backgroundColor: "primary",
                          width: "100%",
                          textTransform: "capitalize",
                          fontSize: "18px",
                        }}
                        onClick={handleSendBack}
                      >
                        Send Back To Manager
                      </Button>
                    </Grid>
                  </Grid>
                  </Grid>
                  </>
                )}

              {/* buttons end here */}
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default SrManagerApproval;
