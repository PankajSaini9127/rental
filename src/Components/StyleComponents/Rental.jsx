import { Button, Dialog, DialogContent, Grid, Link, Modal, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

import { saveAs } from "file-saver";

import { Document, Page } from "react-pdf";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import Draggable from "react-draggable";

const DataFieldStyle = ({ field, value, href, name, bold, cursor,partLabel }) => {
  const [open, setOpen] = useState(false);
  const typographyStyle = {
    textTransform: "capitalize",
    color: "var(--main-color)",
    fontWeight: "600",
    // "@media(max-width:900px)": { fontSize: "14px" },
  };

  // console.log(href)
  function handleClick() {

    saveAs(href, name);
  }

  function handleView() {
    // console.log(href.split(".").slice(-1));
    setOpen(true);
  }

  //modal box
  function handleClose() {
    setOpen(false);
  }

  return (
    <Grid item md={3} xs={6} sx={{ p: '0 !important', overflow: "hidden" }}>
      {href !== undefined && <ImageView
        open={open}
        handleClose={handleClose}
        href={href !== undefined ? href : ""}
        name={name}
      />}
      <Typography variant="h6" sx={typographyStyle}>
        {" "}
        {field}
      </Typography>
      <Stack direction="column"  gap={1}>
        <Typography
          variant="body2"
          sx={{ color: "black", cursor: cursor && "pointer" }}
          fontWeight={bold ? "600" : ""}
          flex={1}
        >
          {" "}
          {value}
        </Typography>
        {href !== undefined && (
          <Box sx = {{display : 'flex', gap : 1}}>
            <VisibilityIcon color={"primary"} onClick={handleView} />
            <DownloadIcon color={"primary"} onClick={handleClick} />
          </Box >
        )}
         <span style = {{color:"#0164AE"}}>
          {partLabel}
        </span>
      </Stack>
    </Grid>
  );
};

const YearField = ({ year, amount,Increment,incrementType }) => {
  const fieldStyle = {
    fontSize: "17px",
    color: "var(--main-color)",
    fontWeight: "600",
  };

  return (
    <Grid item md={2} xs={4}>
      <Typography variant="body1" sx={fieldStyle}>
        {year}
      </Typography>
      <Typography variant="body1" sx={{ color: "black" }}>
       <strong>{incrementType}</strong> : {Increment}
      </Typography>
      <Typography variant="body1" sx={{ color: "black" }}>
      <strong>Monthly Rent</strong>: {amount}
      </Typography>
    </Grid>
  );
};

const DocumentView = ({ title, img,partLabel }) => {
  console.log(partLabel)
   const [open, setOpen] = useState(false);
   function handleView() {
    console.log(img.split(".").slice(-1));
    setOpen(true);
  }

  //modal box
  function handleClose() {
    setOpen(false);
  }


  const [imgView,setImgView] =useState(false)

  function handleClick(partLabel,title) {

    saveAs(partLabel, title);
  }

  return (
    <Grid item xs={4}>
    { img !== undefined &&   <ImageView
        open={open}
        handleClose={handleClose}
        href={img}
        name={title}
      />}
      <Typography
        variant="body1"
        fontSize={"18px"}
        color={"primary"}
        fontWeight={"600"}
        textTransform={"capitalize"}
        sx={{ "@media(max-width:900px)": { fontSize: "16px" } }}
      >
        {" "}
        {title}
      </Typography>
      <Box
        sx={{
          height: "100px",
          border: "1px solid var(--main-color)",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            color: "rgba(16, 99, 173, 0.47)",
            height: "100%",
            width: "50%",
          }}
        >
          <Link
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
            // href={img}
            // target="_blank"`
            onClick={handleView}
          >
            View
          </Link>
        </Button>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            color: "rgba(16, 99, 173, 0.47)",
            height: "100%",
            width: "50%",
          }}
        >
          <Link
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
            onClick={() => saveAs(img, title)}
          >
            Download
          </Link>
        </Button>
      </Box>
      {partLabel && <Box sx={{mt:1}}> 
              <VisibilityIcon color={"primary"} onClick={()=>setImgView(true)} sx={{mr:1}} /> 
             <DownloadIcon color={"primary"} onClick={handleClick} />
             </Box>
      }
    </Grid>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export function ImageView({ open, handleClose, href, name }) {
  const fileType = href ?  href.includes("pdf") : false;

  function DialogDrgable (props){
    return (
      <Draggable handle="#modalBox">
        <Paper {...props}/>
      </Draggable>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modalBox"
      aria-describedby="modal-modal-description"
      PaperComponent={DialogDrgable}
    >
      <DialogContent id="modalBox">
        <Box sx={{height:'400px',width:"400px"}}>
      {fileType ? (
        <Box sx={style}>
          {" "}
          <iframe src={href} title={name} height={500}></iframe>
        </Box>
      ) : (
        <Box sx={style}>
          <Box component={"img"} src={href} height={500} alt={name} />
        </Box>
      )}
      </Box>
      </DialogContent>
    </Dialog>
  );
}

export { DataFieldStyle, YearField, DocumentView };
