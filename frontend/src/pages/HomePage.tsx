import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Welcome to the Recipe Sharing App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Discover and share the best recipes from around the world.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/recipes"
      >
        Browse Recipes
      </Button>
    </Container>
  );
};

export default HomePage;
