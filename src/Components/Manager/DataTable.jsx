import { Alert, Box, Button, Grid, Snackbar,Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";

import axios from "axios";

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PermissionAlert from "./Alert";
import { delete_agreement, get_agreements, send_to_bhu } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../App";

function DataTable({rows,loading,check,setCheck}) {
 
  const { dispatch } = useContext(AuthContext);
const [ids,setIds]= useState([])

const {auth} = useSelector(s=>s);

const manager_id = auth.id;


  const [err, setErr] = useState({
    open: false,
    type: "",
    message: "",
  })

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
      dispatch({ type: "ADMIN_RECALL" })
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

    return (
      <Grid container>
        <Grid item md={6} sx={{ color: "white !important" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              backgroundColor: "#e3c739",
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
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation(); // don't select this row after clicking
              // deleteAPI(id)
              setDeleteAlert({ open: true, id: id });
            }}
            sx={{
              fontSize: "12px",
              color: "white",
              backgroundColor: "red",
              textTransform: "capitalize",
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
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
              backgroundColor: "#e3c739",
              color: "white",
              fontSize: "12px",
              textTransform: "capitalize",
              width:"100%"
            }}
            onClick={(e) => {
              e.stopPropagation(); // don't select this row after clicking
              navigate(`/managerApproval/${id}`)
            }}
          >
            View
          </Button>
    );
  };
 
const handleSwitch = (e)=>{
  if(ids.includes(e.target.name)){
    setIds(old=>old.filter((i)=> i !== e.target.name))
  }else{

    setIds(old=>[...old,e.target.name])
  }
}  
  
  
const columns = [
  {
    field: "checkbox",
    width: 20,
    type: "number",
    headerClassName: "dataGridHeader",
    headerAlign: "center",
    renderCell: (params) => 
      <Checkbox
      disabled={params.formattedValue === "Hold"? false : true}
        onChange={handleSwitch}
        name={params.id}
        checked={ids.includes(params.id)}
        ></Checkbox>
        // {console.log(params.formattedValue)}
    ,
  },
    {
      field: "code",
      headerName: "Code",
      width: 90,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width:170,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 190,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 180,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "view",
      headerName: "View",
      width: 150,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: detailsButton
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: renderDetailsButton,
    },
];



const handleSelect = (ids)=>{
  
   setIds(ids)
}

const handleSelectSend = (e)=>{
  console.log(ids)
  ids.map(async(id)=>{
    const response = await send_to_bhu({status:"Sent Sr Manager", manager_id},id)  
    console.log(response)
  })
}

 //form delete alert
const [deleteAlert, setDeleteAlert] = useState({ open: false, id: "" });

  const handleConfirm = () => {
    deleteAPI(deleteAlert.id);
    setDeleteAlert({ open: false, id: "" });
  };

  const handleCancel = () => {
    setDeleteAlert({ open: false, id: "" });
  };
  return (
    <>
{
      ids.length > 0 && <Box sx={{display:'flex',justifyContent:'flex-end'}}>
      <Button variant="contained" sx={{textTransform:'capitalize',m:1,mx:3}} onClick={handleSelectSend} >Send To Sr Manager</Button>
      </Box>
    }

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
          "& .statusCell": {
            maxWidth: "92px !important",
            minWidth: "92px !important",
            maxHeight: "30px !important",
            minHeight: "25px !important",
            textAlign: "center !important",
            borderRadius: "10px !important",
            m: "auto",
            mx: 6,
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
            if (parms.field === "status" && parms.row.status === "Approved") {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              parms.row.status === "Pending"
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              parms.row.status === "Rejected"
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");
            return cellClass;
          }}
          onSelectionModelChange={handleSelect}
        ></DataGrid>
      </Box>
    </>
  );
}

export default DataTable;
