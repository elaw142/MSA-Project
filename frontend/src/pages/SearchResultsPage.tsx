import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";

interface Recipe {
  id: number;
  title: string;
  description: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage: React.FC = () => {
  const query = useQuery().get("query") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get(`/recipes?query=${query}`);
        const filteredRecipes = response.data.filter((recipe: Recipe) =>
          recipe.title.toLowerCase().includes(query.toLowerCase())
        );
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 8 }}>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/recipes")}
          sx={{ marginRight: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>
      </Box>
      {recipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No recipes found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea component={Link} to={`/recipes/${recipe.id}`}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {recipe.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchResultsPage;
