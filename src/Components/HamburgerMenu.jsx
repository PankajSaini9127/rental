import {
  Box,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../assest/pic/Dashboard/logo1 2.png";

import "../assest/CSS/hamburgerMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { Vector1, Vector2, Vector3, VectorLogout, VectorUser } from "./Vector";
import { NavExpand, NavItem } from "./StyleComponents/HamburgerStyled";
import MIS from "../assest/pic/Dashboard/mis.png";
import Dashboard from "../assest/pic/Dashboard/chart.png";
import { useDispatch, useSelector } from "react-redux";



function HamburgerMenu({
  handleListing,
  misReports,
  navigateHome,
  monthlyRent,
  renewal,
  monthlyBtn,
  monthly,
  agreements
}) {

  agreements =  agreements ? agreements : []
  const [expand, setExpand] = useState(false);

  const { auth } = useSelector((s) => s);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [collapse, setCollaps] = useState("");

  // logout function
  function logout() {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px" }}
        className={expand ? "HeroSectionMenu" : ""}
        onBlur={() => setExpand(false)}
      >
        <Stack sx={{ flexDirection: "column" }} spacing={2}>
          <Box
            sx={{
              background: `url(${Logo})`,
              height: "66px",
              width: "89px",
              backgroundSize: "cover",
            }}
          />

          <Box sx={{ display: "grid", placeItems: "center", width: "89px" }}>
            <Box
              sx={{
                background: `url(${Dashboard})`,
                backgroundSize: "cover",
                height: "45px",
                width: "45px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/${navigateHome}`)}
            />
          </Box>
          {/* {misReports &&
            misReports.map((row) => (
              <Box
                sx={{ display: "grid", placeItems: "center", width: "89px" }}
              >
                <Box
                  component={Link}
                  sx={{
                    background: `url(${MIS})`,
                    backgroundSize: "cover",
                    height: "45px",
                    width: "45px",
                    cursor: "pointer",
                  }}
                  to={`${row}`}
                />
              </Box>
            ))} */}

          {!expand ? (
            <>
              {auth.role.includes("Admin") && (
                <NavItem
                  Vector={VectorUser}
                  onClick={() => setExpand(!expand)}

                  // onClick={() => navigate("/userManagement")}
                />
              )}
              {(auth.role.includes("Manager") ||
                auth.role.includes("BUH") ||
                auth.role.includes("Senior_Manager") ||
                auth.role.includes("Operations") ||
                auth.role.includes("Finance")) && (
                <NavItem Vector={Vector1} onClick={() => setExpand(!expand)} />
              )}

              {monthlyBtn && (
                <>
                  <NavItem
                    Vector={Vector2}
                    onClick={() => setExpand(!expand)}
                  />
                </>
              )}
               {misReports &&
              <NavItem Vector={Vector1}  onClick={() => setExpand(!expand)} />
               }
              <NavItem Vector={VectorLogout} onClick={logout} />
            </>
          ) : (
            <Stack container spacing={2}>
              {/* onclick */}
              {auth.role.includes("Admin") && (
                <NavExpand
                  msg="Users"
                  Vector={VectorUser}
                  NavItem={NavItem}
                  onClick={() => navigate(`/userDashboard`)}
                />
              )}

              <NavExpand
                msg="New Agreement"
                // onClick={handleListing}
                Vector={Vector1}
                onClick={() => setCollaps("Agreement")}
              />
              <Collapse
                in={collapse === "Agreement"}
                timeout="auto"
                unmountOnExit
              >
                <List>
                  {
                    agreements.map(row=>(
                      <ListItem disablePadding>
                      <ListItemButton onClick={()=>navigate(`${row.navigateTo}`)}>
                        <ListItemText
                          primary={row.text}
                          sx={{ color: "primary" }}
                        />
                      </ListItemButton>
                    </ListItem>
                    ))
                  }
                </List>
              </Collapse>
              {monthlyBtn && (
                <>
                  <NavExpand
                    msg="Monthly Payments"
                    // onClick={monthlyRent}
                    onClick={() => setCollaps("Monthly Payment")}
                    Vector={Vector2}
                  />

                  <Collapse
                    in={collapse === "Monthly Payment"}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List>
                      {monthly.map((row, i) => (
                        <ListItem disablePadding>
                          <ListItemButton onClick={()=>navigate(row.navigateTo)}>
                            <ListItemText
                              primary={row.text}
                              sx={{ color: "primary" }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              )}

{misReports &&<>
              <NavExpand
                msg="MIS Report"
                // onClick={handleListing}
                Vector={Vector1}
                onClick={() => setCollaps("MIS")}
              />
              <Collapse
                in={collapse === "MIS"}
                timeout="auto"
                unmountOnExit
              >
                <List>
                  {
                    misReports.map(row=>(
                      <ListItem disablePadding>
                      <ListItemButton onClick={()=>navigate(`${row.navigateTo}`)}>
                        <ListItemText
                          primary={row.text}
                          sx={{ color: "primary" }}
                        />
                      </ListItemButton>
                    </ListItem>
                    ))
                  }
                </List>
              </Collapse>
</>}

              <NavExpand msg="Logout" Vector={VectorLogout} onClick={logout} />
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default HamburgerMenu;

// HamburgerMenu.defaultProps = {
//   monthly: [],
//   agreements:[]
// }
