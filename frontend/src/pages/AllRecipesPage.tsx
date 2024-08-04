import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";

interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
}

const AllRecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Typography variant="h4" gutterBottom>
        All Recipes
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      {filteredRecipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No recipes found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredRecipes.reverse().map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/recipes/${recipe.id}`}
                  sx={{ flexGrow: 1 }}
                >
                  {recipe.imageUrl && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={recipe.imageUrl}
                      alt={recipe.title}
                    />
                  )}
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

export default AllRecipesPage;
