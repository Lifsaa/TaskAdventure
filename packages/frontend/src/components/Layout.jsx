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
  CssBaseline,
} from "@mui/material";
import {
  Home,
  PersonAdd,
  Login,
  Menu,
  Brightness4,
  Brightness7,
  CalendarMonth,
  BarChart,
  Person,
  Phone,
  Logout,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles"; // Use theme from App.jsx

const Layout = ({ children, toggleDarkMode, darkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme(); // Get current theme from App.jsx

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const location = useLocation();
  const token = localStorage.getItem("token");

  // Hide sidebar on Login and Signup pages
  const hideDrawer =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <CssBaseline /> {/* Applies global background & text colors */}
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!hideDrawer && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer}
                sx={{ ml: -3 }}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ ml: 0 }}>
              TaskAdventure
            </Typography>
          </Box>

          {/* Dark Mode Toggle Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sidebar (Drawer) - Only show if NOT on login or signup pages */}
      {!hideDrawer && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" } }}
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
              <ListItemText
                primary="Tasks"
                sx={{ color: theme.palette.text.primary }}
              />
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
              <ListItemText
                primary="Calendar"
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItem>

            <ListItem
              button
              component={token ? Link : "div"}
              to={token ? "/stats" : "#"}
              onClick={token ? toggleDrawer : null}
              sx={{
                opacity: token ? 1 : 0.5,
                pointerEvents: token ? "auto" : "none",
              }}
            >
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText
                primary="Statistics"
                sx={{ color: theme.palette.text.primary }}
              />
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
              <ListItemText
                primary="Account Info"
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItem>

            {/* Always Visible */}
            <ListItem
              button
              component={Link}
              to="/contact"
              onClick={toggleDrawer}
            >
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText
                primary="Contact Us"
                sx={{ color: theme.palette.text.primary }}
              />
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
                  <ListItemText
                    primary="Register"
                    sx={{ color: theme.palette.text.primary }}
                  />
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
                  <ListItemText
                    primary="Login"
                    sx={{ color: theme.palette.text.primary }}
                  />
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
                <ListItemText
                  primary="Log Out"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItem>
            )}
          </List>
        </Drawer>
      )}
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 10,
          bgcolor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
