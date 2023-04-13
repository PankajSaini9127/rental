import { Alert, Box, Button, Grid, Snackbar, Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";

import axios from "axios";

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PermissionAlert from "./Alert";
import {
  add_monthly_rent,
  delete_agreement,
  get_agreements,
  get_landlord_id,
  get_monthaly_rent,
  send_to_bhu,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setRefreshBox } from "../../store/action/action";
import FinalAgreement from "./FinalAgreement";
import Remark from "../RentalPortal/Remark";

function DataTable({ rows, loading, check, setCheck }) {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);

  const { auth } = useSelector((s) => s);

  const [open, setopen] = useState(false);

  const [final_agreement, setFinalAgreement] = useState({
    agreement_date: "",
    final_agreement: "",
    rent_start_date: "",
  });

  const [selectID, setSelectID] = useState("");

  const manager_id = auth.id;

  const [err, setErr] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [data,setData] = useState([])

  //altet close
  const handleClose = () => {
    setErr({
      open: false,
      type: "",
      message: "",
    });
  };

  // api for delete record
  const deleteAPI = async (id) => {
    const deleteItem = await delete_agreement(id);
    if (deleteItem.data.success) {
      dispatch(setRefreshBox());
      setErr({
        open: true,
        type: "warning",
        message: deleteItem.data.message,
      });
    } else {
      setErr({
        open: true,
        type: "error",
        message: deleteItem.data.message,
      });
    }
  };

  const navigate = useNavigate();

  const renderDetailsButton = (e) => {
    const id = e.id;

    // console.log(e.row);

    return (
      <>
        {(e.row.status === "Sent Back From Sr Manager" ||
          e.row.status === "Sent Back From BUH" ||
          e.row.status === "Sent Back From Finance" ||
          e.row.status === "Sent Back From Operations") && (
          <Grid container>
            <Grid item md={6} sx={{ color: "white !important" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#62CDFF",
                  color: "white",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // don't select this row after clicking
                  id && navigate(`/editAgreement/${id}`, { id });
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        )}
        {e.row.status === "Hold" && (
          <Grid container>
            <Grid item md={6} sx={{ color: "white !important" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#62CDFF",
                  color: "white",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // don't select this row after clicking
                  id && navigate(`/editAgreement/${id}`, { id });
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#f13c3c",
                  color: "white",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // don't select this row after clicking
                  // deleteAPI(id)
                  setDeleteAlert({ open: true, id: id });
                }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        )}
        {e.row.status === "Approved" && e.row.utr_number !== "" && (
          <Grid container>
            <Grid item md={6} sx={{ color: "white !important" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#62CDFF",
                  color: "white",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                //  startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // don't select this row after clicking
                  APICALL(id)
                  setSelectID(id);
                  setopen(true);
                }}
              >
                Final Agreement
              </Button>
            </Grid>
          </Grid>
        )}
      </>
    );
  };

  const detailsButton = (e) => {
    const id = e.id;

    return (
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
          navigate(`/managerApproval/${id}`);
        }}
      >
        View
      </Button>
    );
  };

  const handleSwitch = (e) => {
    console.log(ids.includes(e.target.name));
    console.log(ids);
    if (ids.includes(e.target.name)) {
      console.log("out");
      setIds(ids.filter((i) => i !== e.target.name));
    } else {
      console.log("in", e.target.name, ids);
      setIds([...ids, e.target.name]);
    }
  };

  const columns = [
    {
      field: "checkbox",
      width: 20,

      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.formattedValue === "Hold" ? (
            <Checkbox
              onChange={handleSwitch}
              name={params.id}
              checked={ids.includes(params.id)}
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
      width: 90,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "view",
      headerName: "View",
      width: 150,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: detailsButton,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: renderDetailsButton,
    },
  ];

  //form delete alert
  const [deleteAlert, setDeleteAlert] = useState({ open: false, id: "" });

  const handleConfirm = () => {
    deleteAPI(deleteAlert.id);
    setDeleteAlert({ open: false, id: "" });
  };

  const handleCancel = () => {
    setDeleteAlert({ open: false, id: "" });
  };

  async function APICALL(id){
    console.log(id)
    const result = await get_monthaly_rent(id)
   console.log(result)
    if(result.status === 200){
    //   const data = result.data.data.reverse();
   setData(result.data.monthly_rent)
    }
  }
 

  async function AgreementFinal() {
    try {
      const response = await send_to_bhu(
        {
          final_agreement: final_agreement.final_agreement,
          final_agreement_date: final_agreement.agreement_date,
          rent_start_date: final_agreement.rent_start_date,
          status: "Deposited",
        },
        selectID
      );

      if (response.data.success) {
     
    const result = await get_landlord_id(selectID)
    // console.log(result)
    if(result.data.success){
      // setLandlord(result.data.landlords_id)
      console.log(result.data.landlords_id)

      result.data.landlords_id.map(async(row)=>{
        // console.log(row)
            const rent = await add_monthly_rent({
              agreement_id:selectID,
              landlord_id:row.id,
              rent_month: data[0].monthlyRent,
              amount :data[0].rent_month

            })

            if(rent.data.success){
              dispatch(
                setAlert({
                  variant: "success",
                  open: true,
                  message: "Final Agreement Submitted Successfully.",
                })
              );
              setopen(false);
              dispatch(setRefreshBox());
            }else {
              dispatch(
                setAlert({
                  variant: "error",
                  open: true,
                  message: "Something went wrong! Please again later.",
                })
              );}

      
      })
    }


       
      } 
      
    } catch (error) {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Something went wrong! Please again later.",
        })
      );
    }
  }

  const [remarkOpen, setRemarkOpen] = useState(false);

  const [remarkMSG, setRemarkMSG] = useState("");

  const handleSelectSend = (e) => {
    console.log(ids);
    console.log(remarkMSG);
    ids.map(async (id) => {
      const response = await send_to_bhu(
        { status: "Sent To Sr Manager", manager_id, remark: remarkMSG },
        id
      );

      if (response.data.success) {
        setIds([]);
        setRemarkOpen(false);
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Sent To Senior Manager",
          })
        );
        dispatch(setRefreshBox());
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something Went Wrong ! Please Try Again.",
          })
        );
      }
    });
  };

  return (
    <>
      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={() => setRemarkOpen(true)}
          >
            Send To Sr Manager
          </Button>
        </Box>
      )}
      <Remark
        remark={remarkMSG}
        setRemark={setRemarkMSG}
        handleSend={handleSelectSend}
        open={remarkOpen}
        handleClose={() => setRemarkOpen(false)}
      />

      <FinalAgreement
        open={open}
        setOpen={setopen}
        handleConfirm1={AgreementFinal}
        value={final_agreement}
        setValue={setFinalAgreement}
      />

      <Snackbar
        open={err.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={err.type} sx={{ width: "100%" }}>
          {err.message}
        </Alert>
      </Snackbar>

      <PermissionAlert
        handleClose={handleCancel}
        handleConfirm={handleConfirm}
        open={deleteAlert.open}
        message={"Are you sure you want to delete this item?"}
      />

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
          "& .hold": {
            backgroundColor: "#CCCCCC",
            color: "#FFFFFF",
          },
          "& .statusCell": {
            maxHeight: "30px !important",
            minHeight: "25px !important",
            textAlign: "center !important",
            borderRadius: "10px !important",
            m: "auto",
            mx: 1,
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
          // checkboxSelection
          sx={{ color: "black !important", minWidth: "50px" }}
          getCellClassName={(parms) => {
            let cellClass = [];
            if (
              parms.field === "status" &&
              (parms.row.status === "Approved" ||
                parms.row.status === "Deposited")
            ) {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent To Sr Manager" ||
                parms.row.status === "Sent To BUH" ||
                parms.row.status === "Sent To Operations" ||
                parms.row.status === "Sent To Finance Team" ||
                parms.row.status === "Hold")
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent Back From Sr Manager" ||
                parms.row.status === "Sent Back From BUH" ||
                parms.row.status === "Sent Back From Operations" ||
                parms.row.status === "Sent Back From Finance")
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");

            return cellClass;
          }}
          // onSelectionModelChange={handleSelect}
        ></DataGrid>
      </Box>
    </>
  );
}

export default DataTable;
