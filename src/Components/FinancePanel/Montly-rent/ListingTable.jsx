import { Button, Checkbox, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPaymentModifyDate,
  get_monthlt_rent_finance,
  sendMonthyPaymentForword,
} from "../../../Services/Services";
import { setAlert, setRefreshBox } from "../../../store/action/action";
import DialogBoxSBM from "../../RentalPortal/DialogBoxSBM";


export default function ListingTable({rows}) {
  const [utr, setUtr] = useState({ utr: "", paymentDate: "" });
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();

  const [open, setopen] = useState({open:false});


  const { auth, refresh } = useSelector((s) => s);

  const dispatch = useDispatch();

  const [modifyDate,setModifyDate] = useState("")

  async function getUpdateDate (id){
    try {
      const response = await getPaymentModifyDate(id)
      console.log(response)
      if(response.status === 200){
        setModifyDate(response.data.modify_date)
        setopen({open : true, id : id})
      }
    } catch (error) {
      console.log(error)
      dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
    }
   }

  const renderDetailsButton = (e) => {
    const id = e.id;

    return (
      <Grid container>
        {/* <DialogBoxSBM
            open={open.open}
            handleClose={() => setopen({...open,open : false})}
            handleConfirm={handleConfirm}
            value={utr}
            setValue={setUtr}
          /> */}
        <Grid item xs={6} spacing={2}>
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
              navigate(`/finance-monthly-view/${id}`);
            }}
          >
            View
          </Button>
        </Grid>
        {e.row.status === "Approved By Finance" && (
          <Grid item xs={6} spacing={2}>
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
                // navigate(`/finance-monthly-view/${id}`);
                getUpdateDate(id)
              }}
            >
             UTR Number
            </Button>
          </Grid>
        )}
      </Grid>
    );
  };

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

  const columns = [
    {
      field: "checkbox",
      minWidth: 20,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {/* {console.log(ids.includes(params.id))} */}
          {params.formattedValue === "Sent To Finance" ? (
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
      minWidth: 100,
      flex: 1,
      type: "number",
      headerAlign: "center",
    },
    {
      field: "month_of_rent",
      headerName: "Rent Month",
      headerAlign: "center",
      flex: 1,
      minWidth:100
    },
    {
      field: "name",
      headerName: "Landlord Name",
      minWidth: 170,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 150,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "gst",
      headerName: "GST",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "manager",
      headerName: "Manager",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "srm_name",
      headerName: "Sr Manager",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "operations",
      headerName: "Operations",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "total_month_rent",
      headerName: "Month Rent",
      headerAlign: "center",
      flex: 1,
      minWidth:130
    },
    {
      field: "percentage",
      headerName: "Percentage Share",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "rent_amount",
      headerName: "Payable Rent",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      //  maxWidth:200
    },
    {
      field: "gst_fee",
      headerName: "GST",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      //  maxWidth:200
    },
    {
      field: "total_rent",
      headerName: "Total Rent Payable",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      //  maxWidth:200
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      minWidth: 200,
      flex: 1,
    },
    // {
    //   field: "utr",
    //   headerName: "UTR Number",
    //   minWidth: 100,
    //   headerAlign: "center",
    //   flex: 1,
    // },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      minWidth:200,
      renderCell: renderDetailsButton,
    },
  ];

  async function handleApprove() {
    ids.map(async (id) => {
      const send = await sendMonthyPaymentForword(id, {
        status: "Approved By Finance",
        finance_id: auth.id,
      });
      console.log(send.data.success);
      if (send.data.success) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Approved",
          })
        );
        setIds([]);
        dispatch(setRefreshBox());
        //  navigate(-1)
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong Please Try Again Later.",
          })
        );
      }
    });
  }


  const handleConfirm = async (e) => {
    // console.log(setRows);
   
    const response = await sendMonthyPaymentForword(
      open.id,
      {
        status: "Paid",
        utr_number: utr.utr,
        payment_date: utr.paymentDate,
        update_at:new Date()
      }
      
    );
    if (response.data.success) {
      
      setUtr({utr : "", paymentDate : ''})
      setopen({open : false})
    
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "UTR Number Added.",
        })
      );
      dispatch(setRefreshBox())
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
      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={handleApprove}
          >
            Approve
          </Button>
        </Box>
      )}
      {/* <Remark remark={remarkMSG} setRemark={setRemarkMSG} handleSend={handleSend} open={remarkOpen} handleClose={()=>setRemarkOpen(false)} /> */}

      <DialogBoxSBM
            open={open.open}
            handleClose={() => setopen({...open,open : false})}
            handleConfirm={handleConfirm}
            value={utr}
            setValue={setUtr}
            modifyDate={modifyDate}
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
            // maxWidth:"180px !important",
            // minWidth:"92px !important",
            maxHeight: "30px !important",
            minHeight: "25px !important",
            alignSelf: "center",
            mx: "1",
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
            if (parms.field === "status" && parms.row.status === "Paid") {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent To Sr Manager" ||
                parms.row.status === "Sent To BUH" ||
                parms.row.status === "Sent To Operations" ||
                parms.row.status === "Sent To Finance" ||
                parms.row.status === "Hold"
                ||parms.row.status ===  "Approved By Finance")
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
          // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        ></DataGrid>
      </Box>
    </>
  );
}
