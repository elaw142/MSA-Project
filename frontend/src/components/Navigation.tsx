import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Navigation: React.FC = () => {
  const { token, userId } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Recipe App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/recipes">
          Recipes
        </Button>
        {token && userId && (
          <>
            <Button
              color="inherit"
              component={Link}
              to={`/userprofile/${userId}`}
            >
              My Profile
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={`/editprofile/${userId}`}
            >
              Edit Profile
            </Button>
            <Button color="inherit" component={Link} to="/add-recipe">
              Add Recipe
            </Button>
          </>
        )}
        {!token && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
