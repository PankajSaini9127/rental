import { Box, Button, Checkbox, Grid} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setAlert, setRefreshBox } from "../../store/action/action";
import {  send_to_bhu } from "../../Services/Services";

function DataTable({ rows, loading }) {
  const dispatch = useDispatch();

  async function handleRenewal(id) {
    try {
      const response = await send_to_bhu(
        { renewal_status: "Sent To Sr Manager For Renewal" },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Sent To Sr Manager For Renewal.",
          })
        );
        dispatch(setRefreshBox());
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
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

  //handle terminate  
  async function handleTerminate (id){
    try {
      const response = await send_to_bhu(
        { renewal_status: "Sent To Sr Manager For Termination" },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Sent To Sr Manager For Terminate",
          })
        );
        dispatch(setRefreshBox());
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
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

  function actionButton(e) {
    const id = e.id;
    return (
      <Grid container>
       
        {e.row.status === "Pending For Renewal" && (
          <>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{
                backgroundColor: "rgb(103 185 68 / 89%)",
                color: "white",
                fontSize: "12px",
                textTransform: "capitalize",
                // minWidth:"100%"
              }}
              onClick={async (e) => {
                e.stopPropagation(); // don't select this row after clicking
                console.log(id);
                handleRenewal(id);
              }}
            >
              Renew
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              // color="primary"
              size="small"
              style={{
                backgroundColor: "#b53f3f",
                color: "white",
                fontSize: "12px",
                textTransform: "capitalize",
                // width:"100%"
              }}
              onClick={async (e) => {
                e.stopPropagation(); // don't select this row after clicking
                // console.log(id);
                handleTerminate(id);
              }}
            >
              Terminate
            </Button>
          </Grid>
          </>
        )}
        {(e.row.status === "Approved for Renewal") && (
          <>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#807a7a",
                color: "white",
                fontSize: "12px",
                textTransform: "capitalize",
                // width:"100%"
              }}
              onClick={async (e) => {
                e.stopPropagation(); // don't select this row after clicking
                // console.log(id);
                navigate(`/renewal-edit-agreement/${id}`);
              }}
            >
              Edit
            </Button>
          </Grid>
           <Grid item xs={6}>
           <Button
             variant="contained"
             color="primary"
             size="small"
             style={{
               backgroundColor: "rgb(103 185 68 / 89%)",
               color: "white",
               fontSize: "12px",
               textTransform: "capitalize",
               // width:"100%"
             }}
             onClick={(e) => {
               e.stopPropagation(); // don't select this row after clicking
               navigate(`/renewal-view-agreement/${id}`);
             }}
           >
             View
           </Button>
         </Grid>
         </>
        )}
        {(e.row.status === "Sent Back For Renewal Rectification" )&&(
          <Grid item xs={6}>
           <Button
             variant="contained"
             color="primary"
             size="small"
             style={{
               backgroundColor: "rgb(103 185 68 / 89%)",
               color: "white",
               fontSize: "12px",
               textTransform: "capitalize",
               // width:"100%"
             }}
             onClick={(e) => {
               e.stopPropagation(); // don't select this row after clicking
               navigate(`/renewal-view-agreement/${id}`);
             }}
           >
             View
           </Button>
         </Grid>
        )}
         {(e.row.status === "Sent Back For Termination Rectification" )&&(
          <Grid item xs={6}>
           <Button
             variant="contained"
             color="primary"
             size="small"
             style={{
               backgroundColor: "rgb(103 185 68 / 89%)",
               color: "white",
               fontSize: "12px",
               textTransform: "capitalize",
               // width:"100%"
             }}
             onClick={(e) => {
               e.stopPropagation(); // don't select this row after clicking
               navigate(`/renewal-view-agreement/${id}`);
             }}
           >
             View
           </Button>
         </Grid>
        )}
        {(e.row.status === "Approved for Terminate" ) &&(
           <Grid item xs={6}>
           <Button
             variant="contained"
             color="primary"
             size="small"
             style={{
               backgroundColor: "rgb(103 185 68 / 89%)",
               color: "white",
               fontSize: "12px",
               textTransform: "capitalize",
               // width:"100%"
             }}
             onClick={(e) => {
               e.stopPropagation(); // don't select this row after clicking
               navigate(`/renewal-deposit-refund/${id}`);
             }}
           >
            Edit
           </Button>
         </Grid>
        )}
      </Grid>
    );
  }

  const navigate = useNavigate();

  const [ids, setIds] = useState([]);

  //handle Checkbox
  const handleSwitch = (e) => {
    let idVar = Number(e.target.name);
    if (ids.includes(idVar)) {
      // console.log("out");
      setIds(ids.filter((i) => i !== idVar));
    } else {
      // console.log("in", idVar, ids);
      setIds([...ids, idVar]);
    }
  };

  // Code | Landlord Name | Location | Address Line | City |
  //  State | Deposit Amount | Rent Amount | Agreement Expiry Date | No of days 
  //  for Expiry | Status | Action

  const columns = [
    {
      field: "checkbox",
      minWidth: 30,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {/* {console.log(ids.includes(params.id))} */}
          {params.formattedValue === "Pending For Renewal" ? (
            <Checkbox
              onChange={handleSwitch}
              name={params.id}
              checked={ids.includes(params.id) ? true : false}
            />
          ) : (
            <Checkbox disabled={true} />
          )}
        </>
      ),
    },
    {
      field: "code",
      headerName: "Code",
      minWidth: 130,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: " Landlord Name",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    
    {
      field: "location",
      headerName: "Location",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "deposit",
      headerName: "Deposit Amount",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "rentalAmount",
      headerName: "Rent Amount",
      minWidth: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field:"expiry_day" ,
      headerName:"Day In Expire" ,
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "expiry_date",
      headerName: "Agreement Expiry Date",
      minWidth: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
      renderCell: actionButton,
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: "430px",
          px: 2,
          "& .dataGridHeader": {
            color: "#CACACA",
            textAlign: "left",
          },
          "& .green": {
            backgroundColor: "#E7FFE9",
            color: "#41CF2A",
          },
          "& .yellow": {
            backgroundColor: "#FEFFC8",
            color: "#C5C05B",
          },
          "& .red": {
            backgroundColor: "#FFEBE7",
            color: "#CF482A",
          },
          "& .statusCell": {
            maxHeight: "30px !important",
            minHeight: "25px !important",
            textAlign: "center !important",
            borderRadius: "10px !important",
            m: "auto",
          },
          "& .allCell": {
            justifyContent: "center !important",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          loading={loading}
          sx={{ color: "black !important", minWidth: "50px" }}
          getCellClassName={(parms) => {
            let cellClass = [];
            if (
              parms.field === "status" &&
              (parms.row.status === "Approved for Renewal"||
              parms.row.status === "Approved for Terminate" || 
              parms.row.status === "Sent For Termination")
            ) {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Pending For Renewal" ||
                parms.row.status === "Sent To Sr Manager For Renewal" ||
                parms.row.status === "Hold"
                 )
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent Back For Renewal Rectification" || 
              parms.row.status === "Sent To Sr Manager For Termination" ||
              parms.row.status === "Sent Back For Termination Rectification"
              )
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");

            return cellClass;
          }}
          // onSelectionModelChange={(ids) => {console.log(ids)}}
        ></DataGrid>
      </Box>
    </>
  );
}

export default DataTable;
