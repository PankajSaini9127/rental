import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import {
  DataFieldStyle,
  DocumentView,
  YearField,
} from "../StyleComponents/Rental";
import { MyHeader } from "../StyledComponent";
import { useEffect, useState } from "react";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

//download file
import { saveAs } from "file-saver";
import { get_agreement_id, get_data_recovery, send_to_bhu } from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import HamburgerManager from "./HamburgerManager";

const Heading = ({ heading }) => {
  return (
    <Grid item xs={11} sx={{ mt: 6, mb: 2 }}>
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"primary"}
        fontWeight={"600"}
        sx={{ textDecoration: "underline" }}
      >
        {heading}
      </Typography>
    </Grid>
  );
};

function ManagerApproval() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useSelector((s) => s);
  const login_manager_id = auth.id;

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const dispatch = useDispatch();

  const [recovery,setRecovery] = useState({});


  async function get_recovery_data (id){
    try {
     const recovery = await get_data_recovery(id)
     if(recovery.status === 200){
       console.log(recovery.data)
       setRecovery(recovery.data.data[0])
     }
    } catch (error) {
     console.log(error)
     dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong!!"}))
    }
 }


 
  async function getData (id){
    try {
      const agreement = await get_agreement_id(id);
      console.log(agreement.data);
      if (agreement.data.success) {
        console.log(agreement.data.agreement[agreement.data.ids[0]].id)
        get_recovery_data(agreement.data.agreement[agreement.data.ids[0]].id)
        setAgreement(agreement.data.agreement);
        console.log(agreement.data);
        setIds(agreement.data.ids);
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong Please Try Again Later.",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
    }
  }

  console.log(agreement);

  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = async (e) => {
    const response = await send_to_bhu(
      { status: "Sent To Sr Manager", manager_id: login_manager_id,modify_date: new Date() },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Sent To Sr Manager",
        })
      );
      navigate("/listing");
    } else {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Something went wrong! Please again later.",
        })
      );
    }
  };

  function getIncrement(rent, value, type) {
    let incrementType;
    rent = Number(rent);
    value = Number(value);
    if (type === "Percentage") {
      incrementType = `${parseInt(((value - rent) / rent) * 100)}%`;
    } else if (type === "Value") {
      incrementType = value - rent;
    }
    return incrementType;
  }

  return (
    <>
      {ids && ids.length > 0 && (
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
          {/* <a id="button"></a> */}

          {/* <HamburgerMenu
            navigateHome={"dashboard"}
            handleListing={() => navigate("/listing")}
            monthlyRent={() => navigate("/monthly-payment")}
            renewal={() => navigate(`/renewal`)}
            monthlyBtn="true"
          /> */}

          <HamburgerManager/>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
            item
            xs={12}
            sx={{ justifyContent: "space-between", display: "flex" }}
          >
            <MyHeader>Rental Management System</MyHeader>
            <Typography mt="15px" mr="15px" fontWeight="600">
              Welcome {auth.name}
            </Typography>
          </Grid>
            <Box className="backButton">
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                size={"large"}
              >
                <ArrowCircleLeftIcon
                  sx={{ fontSize: "3rem" }}
                  color="#FFFFF !important"
                />
              </IconButton>
            </Box>

            <Grid  container sx = {{alignItems : "baseline" ,justifyContent: "center", mt: 3 }} >
              {/* Basic Details */}
              <Grid item md={10}>
                <Grid  container sx = {{alignItems : "baseline" }}>
                  {agreement[ids[0]].status === "Deposited" && (
                    <>
                      <Grid  container sx = {{alignItems : "baseline" }}>
                        <DataFieldStyle
                          field={"Final Agreement"}
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
                          field={"Monthly Rent Start Date"}
                          value={agreement[ids[0]].rent_start_date}
                        />
                      </Grid>
                      {/* <Grid  container sx = {{alignItems : "baseline",mt: 1 }} >
                        <DataFieldStyle
                          field={"Deposit UTR Number"}
                          value={agreement[ids[0]].utr_number}
                        />
                        <DataFieldStyle
                          field={"Deposit Payment Date"}
                          value={agreement[ids[0]].payment_date}
                        />
                      </Grid> */}
                    </>
                  )}

{agreement[ids[0]].site_visit_date !== null &&(
                    <>
                    <Grid container sx = {{alignItems : "baseline" }}>
                      <DataFieldStyle
                        field={"Site Visit date"}
                        value={agreement[ids[0]].site_visit_date}
                      />
                      <DataFieldStyle
                        field={"Site Visit Remark"}
                        value={agreement[ids[0]].site_visit_remark}
                      />
                    </Grid>
                  </>
                )}
                </Grid>

                <Grid  container sx = {{alignItems : "baseline",mt: 2 }}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement[ids[0]].state}
                  />
                  <DataFieldStyle
                    field={"city"}
                    value={agreement[ids[0]].city}
                  />
                  <DataFieldStyle
                    field={"location"}  
                    value={agreement[ids[0]].location}
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
                    field={"lock in Month"}
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
                      <Grid  container sx = {{alignItems : "baseline",mt: 4  }} spacing={2}>
                        <Grid item xs={12}  container sx = {{alignItems : "baseline" }}>
                          <DataFieldStyle
                            field={"yearly Increment"}
                            value={agreement[ids[0]].yearlyIncrement}
                          />
                        </Grid>
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
                          Increment={getIncrement(
                            agreement[ids[0]].year1,
                            agreement[ids[0]].year2,
                            agreement[ids[0]].yearlyIncrement
                          )}
                        />
                        {(agreement[ids[0]].tenure === "3 Year" ||
                          agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 3"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year3}
                            Increment={getIncrement(
                              agreement[ids[0]].year2,
                              agreement[ids[0]].year3,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {(agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 4"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year4}
                            Increment={getIncrement(
                              agreement[ids[0]].year3,
                              agreement[ids[0]].year4,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {agreement[ids[0]].tenure === "5 Year" && (
                          <YearField
                            year={"Year 5"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year5}
                            Increment={getIncrement(
                              agreement[ids[0]].year4,
                              agreement[ids[0]].year5,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                      </Grid>
                    </>
                  )}

                  {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <>
                      <Grid  container sx = {{alignItems : "baseline",mt: 3  }} >
                        {/* <Grid item xs={12}>
                          <Typography variant="body1" fontWeight="600">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid> */}
                        <Heading
                          heading={`Landlord ${id + 1} Personal Details`}
                        />
                        <DataFieldStyle
                          field={"name of lessor"}
                          value={agreement[ids[0]].name[id]}
                        />
                        <DataFieldStyle
                          field={"aadhaar number"}
                          value={agreement[ids[0]].aadharNo[id]}
                          href={agreement[ids[0]].aadhar_card[id]}
                          name={"AadharCard"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"PAN number"}
                          value={agreement[ids[0]].panNo[id]}
                          href={agreement[ids[0]].pan_card[id]}
                          name={"pan_certicate"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"GST number"}
                          value={agreement[ids[0]].gstNo[id]}
                          href={agreement[ids[0]].gst[id]}
                          name={"gst"}
                          bold={true}
                          cursor={true}
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
                      <Grid  container sx = {{alignItems : "baseline",mt: 1 }} >
                      <DataFieldStyle
                        field={"Deposit UTR Number"}
                        value={agreement[ids[0]].utr_number[id]}
                      />
                      <DataFieldStyle
                        field={"Deposit Payment Date"}
                        value={agreement[ids[0]].payment_date[id]}
                      />
                    </Grid>
                    </>
                    )
                  )}
                </Grid>
              </Grid>

              {/* Bank Details start here */}
              {/* <Heading heading={"Bank Details"} /> */}

              <Grid item md={10}>
                <Grid  container sx = {{alignItems : "baseline" }} >
                  {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <Grid  container sx = {{alignItems : "baseline" }} >
                        {/* <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                          <Typography variant="body1" fontWeight="600">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid> */}
                        <Heading heading={`Landlord ${id + 1} Bank Details`} />
                        <DataFieldStyle
                          field={"bank name"}
                          value={agreement[ids[0]].bankName[id]}
                        />
                        <DataFieldStyle
                          field={"beneficiary name"}
                          value={agreement[ids[0]].benificiaryName[id]}
                        />
                        <DataFieldStyle
                          field={"bank A/c number"}
                          value={agreement[ids[0]].accountNo[id]}
                          href={agreement[ids[0]].cheque[id]}
                          name={"cheque"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"Bank IFSC"}
                          value={agreement[ids[0]].ifscCode[id]}
                          partLabel={agreement[ids[0]].branchName[id]}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>

              {/* Bank Details Ends here */}

              {/* Bank Details Ends here */}

              {/* Document Section start here */}

              <Grid item md={10}>
                <Grid  container spacing={4} sx= {{alignItems : "baseline", mt: 1  }}  >
                  <Grid item xs={12}>
                    <Heading heading={"Document View/Download"} />
                  </Grid>
                  <DocumentView
                    title={"draft agreement"}
                    img={agreement[ids[0]].draft_agreement}
                  />
                  <DocumentView
                    title={"electricity bill"}
                    img={agreement[ids[0]].electricity_bill}
                  />
                  {/* <DocumentView
                    title={"Cancel bank cheque"}
                    img={agreement[ids[0]].cheque}
                  /> */}
                  <DocumentView
                    title={"maintaince bill"}
                    img={agreement[ids[0]].maintaince_bill}
                  />
                  <DocumentView title={"POA"} img={agreement[ids[0]].poa} />
                  <DocumentView
                    title={"Property tax receipt"}
                    img={agreement[ids[0]].tax_receipt}
                  />
                  {agreement[ids[0]].leeseName && (
                    <DocumentView
                      title={"NOC (if multiple owner)"}
                      img={agreement[ids[0]].noc}
                    />
                  )}
                    <DocumentView
                    title={"Property Picture"}
                    img={agreement[ids[0]].property_pic}
                  />
                </Grid>
              </Grid>
              {/* // Landlord assets */}

              {agreement[ids[0]].renewal_status === "Sent Forr Termination"&&
              <Grid item  container sx = {{alignItems : "baseline",mt: 5  }} xs={10} >
              <DataFieldStyle
                field={"Landlord Assets"}
                value={agreement[ids[0]].assets}
              />
            </Grid>
             }

              {agreement[ids[0]].assets && (
              <Grid item  container sx = {{alignItems : "baseline",mt: 5  }} xs={10} >
                <DocumentView
                  title={"Termination File"}
                  img={agreement[ids[0]].file}
                />
              </Grid>)}
              {/* document section ends here */}

              {agreement[ids[0]].remark && (
                <Grid item  container sx = {{alignItems : "baseline",mt: 5  }} xs={10} >
                  <DataFieldStyle
                    field={"Remark !"}
                    href={agreement[ids[0]].remark}
                  />
                </Grid>
              )}

                {/* Buttons start here*/}
   
              {/* Buttons start here*/}

              {agreement[ids[0]].status === "Hold" && (
                <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                  <Grid  container spacing={2} sx={{ alignItems : "baseline",justifyContent: "center" }}>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{
                          height: "55px",
                          borderRadius: "12px",
                          backgroundColor: "primary",
                          width: "100%",
                          color: "#FFFFFF",
                          textTransform: "capitalize",
                          fontSize: "18px",
                        }}
                        onClick={handleSubmit}
                      >
                         Send to Sr Manager
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* buttons end here */}
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default ManagerApproval;
