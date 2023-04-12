import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { send_to_operations } from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import {
  ApprovedByFinance,
} from "../../Services/Services";
import Remark from "../RentalPortal/Remark";
function FinanceTable({ rows, setRows }) {
  const navigate = useNavigate();

  const [ids, setIds] = useState([]);


  const [open, setopen] = useState(false);

  const [utr, setUtr] = useState({ utr: "", paymentDate: "" });


  const { auth } = useSelector((s) => s);
  const srm_id = auth.id;

  const dispatch = useDispatch();

  const renderDetailsButton = (e) => {
    const id = e.id;

    return (
      <Box sx = {{display : "flex", gap : '1rem', width : "100%"}}>
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
          navigate(`/finance-approval/${id}`);
        }}
      >
        View
      </Button>
      {(e.row.status === 'Approved' &&  e.row.utr_number === '') &&
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
             setopen({open : true, id : id})
             }}
           >
             UTR Number
           </Button>}
      </Box>
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
          {console.log(params)}
          {params.formattedValue === "Sent To Finance Team" ? (
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
      width: 100,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "name",
      headerName: "Name",
      width: 160,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "location",
      headerName: "Location",
      width: 130,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    // {
    //   field: "manager",
    //   headerName: "Manager",
    //   width: 130,
    //   headerClassName: "dataGridHeader",
    //   headerAlign: "center",
    //   flex:1
    // },
    // {
    //   field: "sr_manager",
    //   headerName: "Sr Manager",
    //   width: 130,
    //   headerClassName: "dataGridHeader",
    //   headerAlign: "center",
    //   flex:1
    // },
    {
      field: "address",
      headerName: "Address",
      width: 180,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      // flex:1
    },

    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 120,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      // flex:1
    },
    {
      field: "status",
      headerName: "Status",
      width: 190,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      // flex:1
    },
    // {
    //   field: "view",
    //   headerName: "View",
    //   width: 130,
    //   headerClassName: "dataGridHeader",
    //   headerAlign: "center",
    //   renderCell: renderDetailsButton,
    //   flex:1
    // },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: renderDetailsButton,
      // flex:1
    },
  ];

  // const onRowsSelectionHandler = (ids) => {
  //     setIds(ids)
  //   };

  const [remarkOpen,setRemarkOpen] = useState(false)

  const [remarkMSG,setRemarkMSG] = useState("")

  function handleSend() {
    ids.map(async (id) => {
      const response = await send_to_operations(
        { status: "Approved", finance_id:srm_id ,remark:remarkMSG},
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            vatiant: "success",
            open: true,
            message: "Approved ",
          })
        );
        setRemarkOpen(false)
      } else {
        dispatch(
          setAlert({
            vatiant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    });
  }


  const handleConfirm = async (e) => {
    // console.log(setRows);
   
    const response = await ApprovedByFinance(
      {
        status: "Approved",
        finance_id: srm_id,
        utr_number: utr.utr,
        payment_date: utr.paymentDate,
      },
      open.id
    );
    if (response.data.success) {
      setRows(old=>rows.map((data)=>{
        // console.log(data.id,open.id)
        if(data.id === open.id)
        {
          data.utr_number = utr.utr
          return data
        }
        else return data
        
      }))
      setUtr({utr : "", paymentDate : ''})
      setopen({open : false})
    
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Approved.",
        })
      );
      navigate("/finance-listing");
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

  return (
    <>
        <DialogBoxSBM
            open={open.open}
            handleClose={() => setopen({...open,open : false})}
            handleConfirm={handleConfirm}
            value={utr}
            setValue={setUtr}
          />

      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={()=>setRemarkOpen(true)}
          >
            Approve
          </Button>
        </Box>
      )}
       <Remark remark={remarkMSG} setRemark={setRemarkMSG} handleSend={handleSend} open={remarkOpen} handleClose={()=>setRemarkOpen(false)} />

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
            // maxWidth:"180px !important",
            // minWidth:"92px !important",
            maxHeight: "30px !important",
            minHeight: "25px !important",
            alignSelf: "center",
            mx: 1,
            textAlign: "center !important",
            borderRadius: "10px !important",
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
          // checkboxSelection
          sx={{ color: "black !important", minWidth: "50px" }}
          getCellClassName={(parms) => {
            let cellClass = [];
            if (
              parms.field === "status" &&
              (parms.row.status === "Approved" || parms.row.status === "Deposited")
            ) {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent To Sr Manager" ||
                parms.row.status === "Sent To BUH" ||
                parms.row.status === "Sent To Operations" ||
                parms.row.status === "Sent To Finance Team" || 
                parms.row.status === "Hold"
                )
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent Back From Sr Manager"  || parms.row.status === "Sent Back From BUH" ||
              parms.row.status === "Sent Back From Operations" || parms.row.status === "Sent Back From Finance"
              )
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");

            return cellClass;
          }}
          // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        ></DataGrid>
      </Box>
    </>
  );
}

export default FinanceTable;
