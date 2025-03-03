import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { Home, PersonAdd, Login, Menu } from "@mui/icons-material";
import { CalendarMonth, BarChart, Person, Phone } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation(); // Get current route
  const token = localStorage.getItem("token"); // Check if user is logged in

  // Hide sidebar on Login and Signup pages
  const hideDrawer =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {!hideDrawer && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
              sx={{ ml: -66 }} // Moves it to the far left
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              ml: 7,
              position: "absolute",
              left: "50%",
              transform: "translateX(-65%)",
            }} // Centers title
          >
            TaskAdventure
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) - Only show if NOT on login or signup pages */}
      {!hideDrawer && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModelProps={{ keepMounted: true }}
          sx={{
            width: 10,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Avatar
              sx={{ bgcolor: "blue", mx: "auto", width: 56, height: 56 }}
            />
            <Typography variant="h6">User</Typography>
          </Box>
          <List>
            {/* Protected Pages (Only for Logged-in Users) */}
            <ListItem
              button
              component={token ? Link : "div"}
              to={token ? "/tasks" : "#"}
              onClick={token ? toggleDrawer : null}
              sx={{
                opacity: token ? 1 : 0.5,
                pointerEvents: token ? "auto" : "none",
              }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Tasks" sx={{ color: "black" }} />
            </ListItem>

            <ListItem
              button
              component={token ? Link : "div"}
              to={token ? "/calendar" : "#"}
              onClick={token ? toggleDrawer : null}
              sx={{
                opacity: token ? 1 : 0.5,
                pointerEvents: token ? "auto" : "none",
              }}
            >
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary="Calendar" sx={{ color: "black" }} />
            </ListItem>

            <ListItem
              button
              component={token ? Link : "div"}
              to={token ? "/statistics" : "#"}
              onClick={token ? toggleDrawer : null}
              sx={{
                opacity: token ? 1 : 0.5,
                pointerEvents: token ? "auto" : "none",
              }}
            >
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="Statistics" sx={{ color: "black" }} />
            </ListItem>

            <ListItem
              button
              component={token ? Link : "div"}
              to={token ? "/accountinfo" : "#"}
              onClick={token ? toggleDrawer : null}
              sx={{
                opacity: token ? 1 : 0.5,
                pointerEvents: token ? "auto" : "none",
              }}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Account Info" sx={{ color: "black" }} />
            </ListItem>

            {/* Always Visible */}
            <ListItem
              button
              component={Link}
              to="/contactus"
              onClick={toggleDrawer}
            >
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary="Contact Us" sx={{ color: "black" }} />
            </ListItem>

            {/* If NOT logged in, show Register & Login */}
            {!token && (
              <>
                <ListItem
                  button
                  component={Link}
                  to="/signup"
                  onClick={toggleDrawer}
                >
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Register" sx={{ color: "black" }} />
                </ListItem>

                <ListItem
                  button
                  component={Link}
                  to="/login"
                  onClick={toggleDrawer}
                >
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary="Login" sx={{ color: "black" }} />
                </ListItem>
              </>
            )}

            {/* If logged in, show Log Out */}
            {token && (
              <ListItem
                button
                onClick={() => {
                  localStorage.removeItem("token"); // Clear token on logout
                  window.location.href = "/login"; // Redirect to login page
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Log Out" sx={{ color: "black" }} />
              </ListItem>
            )}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 2, mt: 10 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
