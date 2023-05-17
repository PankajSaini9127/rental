import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add_utr_datails, convertToPaid, getModifyDate, send_to_operations } from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import {
  ApprovedByFinance,
} from "../../Services/Services";
import Remark from "../RentalPortal/Remark";
function FinanceTable({ rows, setRows }) {
  const navigate = useNavigate();

  const [ids, setIds] = useState([]);


  const [open, setopen] = useState({open:false});
  const [code, setCode] = useState({open:false});

  const [utr, setUtr] = useState({ utr: "", paymentDate: "" });


  const { auth } = useSelector((s) => s);
  const srm_id = auth.id;

  const [modifyDate,setModifyDate] = useState("")

  const dispatch = useDispatch();

  const renderDetailsButton = (e) => {
    const id = e.id;
    const agreement_id = e.row.i

    const code = e.row.code;
    const modify_date = e.row.modify_date
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
      {(e.row.status === 'Approved' &&  e.row.utr_number === null) &&
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
               setModifyDate(modify_date)
               setCode(code)
               setopen({open : true, id : id, code})
             }}
           >
             UTR Number
           </Button>}
      {(e.row.status === 'Approved for Termination' || e.row.status === 'Terminated' ) &&
      <Button
             variant="contained"
             color="primary"
             size="small"
             style={{
               backgroundColor: "rgb(205 22 239)",
               color: "white",
               fontSize: "12px",
               textTransform: "capitalize",
             }}
            //  startIcon={<EditIcon />}
             onClick={(e) => {
              // console.log(`/balance_recovery/${agreement_id}`)
              navigate(`/balance_recovery/${agreement_id}`)
             }}
           >
            Deposit Recovery
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
      field: "initiateDate",
      headerName: "Initiate Date",
      minWidth: 110,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 90,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "code",
      headerName: "Code",
      minWidth: 90,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Landlord Name",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 160,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },

    {
      field: "state",
      headerName: "State",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
{
      field: "buh",
      headerName: "BUH",
      minWidth: 160,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
       flex:1
    },
    {
      field: "deposit",
      headerName: "Deposit Amount",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "payable_deposit",
      headerName: "Deposit Payable",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "rentalAmount",
      headerName: "Rent Amount",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "view",
      headerName: "Action",
      minWidth: 250,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: renderDetailsButton,
    }
  ];



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
            variant: "success",
            open: true,
            message: "Approved ",
          })
        );
        setRemarkOpen(false)
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    });
  }


  const handleConfirm = async (e) => {
    console.log(code);
   
    // return 1
    const response = await Add_utr_datails(
      {
        utr_number: utr.utr,
        payment_date: utr.paymentDate,
      },
      open.id
    );

    if (response.data.success) {
// settled all the unpaid entries to paid one
const res2 = await convertToPaid(code)

console.log(res2.data)

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
          message: "UTR Details Added",
        })
      );
      navigate(-1);
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

  
  console.log(rows)
  return (
    <>
        <DialogBoxSBM
            open={open.open}
            handleClose={() => {setopen({...open,open : false});setUtr({ utr: "", paymentDate: "" })}}
            handleConfirm={handleConfirm}
            value={utr}
            setValue={setUtr}
            modifyDate={modifyDate}
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
              (parms.row.status === "Sent Back From Sr Manager"  
              ||parms.row.status === "Sent Back From BUH" 
              ||parms.row.status === "Sent Back From Operations" 
              ||parms.row.status === "Sent Back From Finance"
              ||parms.row.status === "Terminated By Manager"
              ||parms.row.status === "Terminated By Sr Manager"
              ||parms.row.status === "Terminated By Operations"
              ||parms.row.status === "Approved for Termination"             
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
