import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { BakeryDining, RiceBowl, LunchDining } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navigation: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
}> = ({ toggleTheme, isDarkMode }) => {
  const { token, userId, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (paths: string[]) => paths.includes(location.pathname);

  const drawer = (
    <List>
      <ListItem
        button
        component={Link}
        to="/"
        onClick={handleDrawerToggle}
        selected={isActive(["/"])}
      >
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/recipes"
        onClick={handleDrawerToggle}
        selected={isActive(["/recipes"])}
      >
        <ListItemText primary="Recipes" />
      </ListItem>
      {token && userId && (
        <>
          <ListItem
            button
            component={Link}
            to={`/userprofile/${userId}`}
            onClick={handleDrawerToggle}
            selected={isActive([`/userprofile/${userId}`])}
          >
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/add-recipe"
            onClick={handleDrawerToggle}
            selected={isActive(["/add-recipe"])}
          >
            <ListItemText primary="Add Recipe" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              logout();
              handleDrawerToggle();
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      )}
      {!token && (
        <>
          <ListItem
            button
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
            selected={isActive(["/login", "/register"])}
          >
            <ListItemText primary="Sign In/Up" />
          </ListItem>
        </>
      )}
      <ListItem button onClick={toggleTheme}>
        <ListItemText primary={isDarkMode ? "Dark Mode" : "Light Mode"} />
        <IconButton color="inherit">
          {isDarkMode ? (
            <BakeryDining sx={{ transform: "rotate(90deg)" }} />
          ) : (
            <RiceBowl />
          )}
        </IconButton>
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button color="inherit" component={Link} to="/">
            <Typography variant="h6" noWrap>
              Nosh
            </Typography>
          </Button>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <LunchDining />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                variant="temporary"
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="inherit"
                component={Link}
                to="/recipes"
                sx={{ fontWeight: isActive(["/recipes"]) ? "bold" : "normal" }}
              >
                Recipes
              </Button>
              {token && userId ? (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/userprofile/${userId}`}
                    sx={{
                      fontWeight: isActive([`/userprofile/${userId}`])
                        ? "bold"
                        : "normal",
                    }}
                  >
                    My Profile
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/add-recipe"
                    sx={{
                      fontWeight: isActive(["/add-recipe"]) ? "bold" : "normal",
                    }}
                  >
                    Add Recipe
                  </Button>
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    fontWeight: isActive(["/login", "/register"])
                      ? "bold"
                      : "normal",
                  }}
                >
                  Sign In/Up
                </Button>
              )}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="mode toggle"
                onClick={toggleTheme}
              >
                {isDarkMode ? (
                  <BakeryDining sx={{ transform: "rotate(90deg)" }} />
                ) : (
                  <RiceBowl />
                )}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
