import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom';

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function BackButton() {

    const navigate = useNavigate();

  return (
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
  )
}

export default BackButton
