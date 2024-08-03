import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Container sx={{ paddingTop: 8, textAlign: "center" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
      >
        Welcome to the Recipe Sharing App
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          marginBottom: 3,
        }}
      >
        Discover and share the best recipes from around the world.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/recipes"
        sx={{ fontSize: { xs: "0.75rem", sm: "1rem", md: "1.25rem" } }}
      >
        Browse Recipes
      </Button>
    </Container>
  );
};

export default HomePage;
