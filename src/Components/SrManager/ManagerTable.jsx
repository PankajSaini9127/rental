import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { send_to_bhu } from "../../Services/Services";
import Remark from "../RentalPortal/Remark";
import { setAlert, setRefreshBox } from "../../store/action/action";
import SiteVisitDate from "./SiteVisitDate";
import SiteVisitDatePopUp from "./SiteVisitDate";

function ManagerTable({ rows }) {
  const navigate = useNavigate();

  const [ids, setIds] = useState([]);

  const { auth } = useSelector((s) => s);

  const dispatch = useDispatch();

  const [SiteVisitDate, setSiteVisit] = useState({ open: false });

  const [sitevisitData, setSiteVisitData] = useState({
    site_visit_remark: "",
    site_visit_date: "",
  });

  console.log(SiteVisitDate);

  const srm_id = auth.id;

  const renderDetailsButton = (e) => {
    const id = e.id;

    return (
      <Grid container spacing={1}>
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
            onClick={(e) => {
              e.stopPropagation(); // don't select this row after clicking
              navigate(`/srManagerApproval/${id}`);
            }}
          >
            View
          </Button>
        </Grid>
        {(e.row.sitevisit === null && (e.row.status === "Sent To Sr Manager" || e.row.status === "Sent To BUH" || e.row.status === "Sent To Operations" ||e.row.status === "Sent To Finance Team"))&& (
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
              onClick={(e) => {
                e.stopPropagation(); // don't select this row after clicking
                setSiteVisit({ open: true, id: id });
              }}
            >
              Site Visit Date
            </Button>
          </Grid>
        )}
      </Grid>
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
      minWidth: 20,

      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.formattedValue === "Sent Sr Manager" ||
          params.formattedValue === "Sent To Sr Manager" ? (
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
      minWidth: 100,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "code",
      headerName: "Code",
      minWidth: 130,
      flex: 1,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Landlord Name",
      minWidth: 180,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 180,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 200,
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
      field: "manager",
      headerName: "Manager",
      minWidth: 160,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex: 1,
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
      headerName: "View",
      minWidth: 230,
      flex: 1,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: renderDetailsButton,
    },
  ];
  const [remarkOpen, setRemarkOpen] = useState(false);

  const [remarkMSG, setRemarkMSG] = useState("");

  function handleSend() {
    ids.map(async (id) => {
      const response = await send_to_bhu(
        { status: "Sent To BUH", srm_id, remark: remarkMSG },
        id
      );
      if (response.data.success) {
        setIds([]);
        setRemarkOpen(false);
        dispatch(setRefreshBox());
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Sent To BUH.",
          })
        );
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
  }

  async function handleSiteVisit (){
    const response = await send_to_bhu(
      sitevisitData,
      SiteVisitDate.id
    );
    if (response.data.success) {
      setIds([]);
      setRemarkOpen(false);
      dispatch(setRefreshBox());
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Site Visit Date Uploaded.",
        })
      );
      setSiteVisit({open:false})

    } else {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Something Went Wrong ! Please Try Again.",
        })
      );
    }
  }

  return (
    <>
      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={() => setRemarkOpen(true)}
          >
            Send To BUH
          </Button>
        </Box>
      )}
      <Remark
        remark={remarkMSG}
        setRemark={setRemarkMSG}
        handleSend={handleSend}
        open={remarkOpen}
        handleClose={() => setRemarkOpen(false)}
      />

      <SiteVisitDatePopUp
        open={SiteVisitDate.open}
        handleClose={() => {
          setSiteVisit({ open: false });
          setSiteVisitData({ site_visit_remark: "", site_visit_date: "" });
        }}
        value={sitevisitData}
        setValue={setSiteVisitData}
        handleConfirm={handleSiteVisit}
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
                parms.row.status === "Sent Back From Finance" ||
                parms.row.status === "Terminated By Manager" ||
                parms.row.status === "Terminated By Sr Manager" ||
                parms.row.status === "Terminated By Operations" ||
                parms.row.status === "Approved for Termination"
                ||  parms.row.status === "Terminated")
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

export default ManagerTable;
