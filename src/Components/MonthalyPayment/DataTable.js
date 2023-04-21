import { Alert, Box, Button, Checkbox, Grid, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";

import axios from "axios";

import {
  add_invoice,
  get_rent_data_ID,
  listMonthRent,
  sendMonthyPaymentForword,
} from "../../Services/Services";

import UploadInvoice from "./UploadInvoice";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setRefreshBox } from "../../store/action/action";

function DataTable({rows}) {
  

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { auth, refresh } = useSelector((state) => state);



  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "",
    invoiceDate: "",
    rentAmount: "",
    gstAmount: "",
    totalAmount: "",
    invoice: "",
    invoice_file_name: "",
    manager_id: auth.id,
    gst: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectID, setSelectID] = useState(0);

  async function getData(id) {
    try {
      const response = await get_rent_data_ID(id);

      console.log(response.data.data[0].invoice_number);
      if (response.data.succes) {
        setInvoiceDetails({
          ...invoiceDetails,
          gst: response.data.data[0].gst ? response.data.data[0].gst : "---",
          rentAmount: response.data.data[0].rent_amount,
          gstAmount: response.data.data[0].gst
            ? (response.data.data[0].rent_amount / 100) * 18
            : 0,
        });
      } else {
        dispatch(
          setAlert({
            open: true,
            message: "something Went Wrong Please Try Again Later.",
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          message: "something Went Wrong Please Try Again Later.",
          variant: "error",
        })
      );
    }
  }

  async function handleSendSRM (id){
     try {
      const send = await sendMonthyPaymentForword(id, {
        status: "Sent To Sr Manager",
        manager_id: auth.id,
      });
      console.log(send.data.success);
      if (send.data.success) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Payment Details Sent To Sr Manager.",
          })
        );
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
     } catch (error) {
      console.log(error)
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
     }
  }

  const gstUploadButton = (e) => {
    const id = e.id;
    // console.log(">>>>>>",e.row.code)
    const code = e.row.code;

    return (
      <>
        <Grid container spacing={5}>
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
              onClick={async (e) => {
                e.stopPropagation(); // don't select this row after clicking
                console.log(id);
                navigate(`/monthly-payment-view/${id}`);
              }}
            >
              View
            </Button>
          </Grid>
          {(e.row.status === "Sent Back From Sr Manager" ||
            e.row.status === "Sent Back From Operations" ||
            e.row.status === "Sent Back From Finance") && (
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "#97999c",
                  color: "white",
                  fontSize: "12px",
                  textTransform: "capitalize",
                  // width:"100%"
                }}
                onClick={(e) => {
                  e.stopPropagation(); // don't select this row after clicking
                  navigate(`/monthly-payment-edit/${id}`);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          {((e.row.status === "Hold" || e.row.status === "Pending") && e.row.gst !== "---") && (
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
                  // navigate(`/BHUapproval/${id}`);
                  getData(id);
                  setSelectID(id);
                  setOpen(true);
                }}
              >
                Upload
              </Button>
            </Grid>
          )}
          {((e.row.status === "Hold" || e.row.status === "Pending")&& e.row.gst === "---") && (
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
                  handleSendSRM(id)
                }}
              >
               Approve
              </Button>
            </Grid>
          )}
        </Grid>
      </>
    );
  };

  const [ids, setIds] = useState([]);
  console.log(ids);

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

  const columns = [
    {
      field: "checkbox",
      width: 20,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {console.log( params)}
          {(params.formattedValue === "" && params.row.status === "Pending")? (
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
      flex: 1,
      minWidth: 100,
      type: "number",
      headerAlign: "center",
    },
    {
      field: "rent_date",
      headerName: "Rent Date",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      // maxHeight:150
    },
    {
      field: "landlord_name",
      headerName: "Landlord Name",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      // maxWidth:200
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      // maxWidth:200
    },
    {
      field: "gst",
      headerName: "GST",
      headerAlign: "center",
      flex: 1,
      minWidth: 120,
      // maxWidth:200
    },
    {
      field: "monthly_rent",
      headerName: "Month Rent",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      // maxWidth:200
    },
    {
      field: "share",
      headerName: "Percentage Share",
      headerAlign: "center",
      minWidth: 100,
      flex: 1,
      // maxWidth:200
    },
    {
      field: "rent_amount",
      headerName: "Payable Amount",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      //  maxWidth:200
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      flex: 1,
      // maxWidth:500,
      minWidth: 150,
    },
    {
      field: "utr_no",
      headerName: "UTR Number",
      headerAlign: "center",
      flex: 1,
      minWidth: 130,
      // maxWidth:200
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      minWidth: 200,
      // maxWidth:250,
      renderCell: gstUploadButton,
    },
  ];

  //upload invoice details
  async function uploadInvoiceDetails() {
    try {
      const addInvoice = await add_invoice(selectID, invoiceDetails);

      console.log(addInvoice);

      if (addInvoice.data.success) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Invoice Details Submited & Sent To Manger",
          })
        );
        dispatch(setRefreshBox());
        setOpen(false);
        setInvoiceDetails({
          invoiceNo: "",
          invoiceDate: "",
          rentAmount: "",
          gstAmount: "",
          totalAmount: "",
          invoice: "",
          invoice_file_name: "",
          manager_id: auth.id,
        });
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Some Error Occured Please Try Again Later.",
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

  function handleHold() {
    ids.map(async (id) => {
      const send = await sendMonthyPaymentForword(id, {
        status: "Hold",
        manager_id: auth.id,
      });
      console.log(send.data.success);
      if (send.data.success) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Payment Details Set On Hold.",
          })
        );
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


  function SendToSrm() {
    ids.map(async (id) => {
      try {
        const send = await sendMonthyPaymentForword(id, {
          status: "Sent To Sr Manager",
          manager_id: auth.id,
        });
        console.log(send.data.success);
        if (send.data.success) {
          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: "Payment Details Sent To Sr Manager.",
            })
          );
          dispatch(setRefreshBox());
          setIds([])
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
       } catch (error) {
        console.log(error)
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

  // handleSendSRM(id)

  return (
    <>
      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 2 }}
            onClick={() => {
              handleHold();
            }}
          >
            Hold
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 1 }}
            onClick={() => {
              SendToSrm();
            }}
          >
            Send To Sr Manager
          </Button>
        </Box>
      )}

      <UploadInvoice
        open={open}
        // setOpen={setOpen}
        handleClose={() => setOpen(false)}
        handleConfirm={uploadInvoiceDetails}
        value={invoiceDetails}
        setValue={setInvoiceDetails}
      />

      <Box
        sx={{
          height: "430px",
          px: 2,
          overflowX: "scroll",
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
            my: 1,
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
          sx={{ color: "black !important", minWidth: "50px", overflow: "auto" }}
          getCellClassName={(parms) => {
            let cellClass = [];
            if (parms.field === "status" && parms.row.status === "Paid") {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Pending" ||
                parms.row.status === "Hold" ||
                parms.row.status === "Sent To Sr Manager" ||
                parms.row.status === "Sent To Operations" ||
                parms.row.status === "Sent To Finance")
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
        ></DataGrid>
      </Box>
    </>
  );
}

export default DataTable;
