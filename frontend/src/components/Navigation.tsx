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
import { Egg, EggAlt, LunchDining } from "@mui/icons-material";
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

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <List>
      <ListItem
        button
        component={Link}
        to="/"
        onClick={handleDrawerToggle}
        selected={isActive("/")}
      >
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/recipes"
        onClick={handleDrawerToggle}
        selected={isActive("/recipes")}
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
            selected={isActive(`/userprofile/${userId}`)}
          >
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/add-recipe"
            onClick={handleDrawerToggle}
            selected={isActive("/add-recipe")}
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
            selected={isActive("/login")}
          >
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/register"
            onClick={handleDrawerToggle}
            selected={isActive("/register")}
          >
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
      <ListItem button onClick={toggleTheme}>
        <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
        <IconButton color="inherit">
          {isDarkMode ? <EggAlt /> : <Egg />}
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
                sx={{ fontWeight: isActive("/recipes") ? "bold" : "normal" }}
              >
                Recipes
              </Button>
              {token && userId && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/userprofile/${userId}`}
                    sx={{
                      fontWeight: isActive(`/userprofile/${userId}`)
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
                      fontWeight: isActive("/add-recipe") ? "bold" : "normal",
                    }}
                  >
                    Add Recipe
                  </Button>
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
              {!token && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{ fontWeight: isActive("/login") ? "bold" : "normal" }}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={{
                      fontWeight: isActive("/register") ? "bold" : "normal",
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="mode toggle"
                onClick={toggleTheme}
              >
                {isDarkMode ? <EggAlt /> : <Egg />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
