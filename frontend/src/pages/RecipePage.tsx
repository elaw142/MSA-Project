import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Rating,
} from "@mui/material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  userID: number;
  reviews: Review[];
}

interface Review {
  id: number;
  reviewerName: string;
  content: string;
  rating: number;
}

const RecipePage: React.FC = () => {
  const { token, userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/recipes/${id}`);
      navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const review: Review = {
        id: 0,
        reviewerName,
        content: reviewContent,
        rating: reviewRating,
      };
      await api.post(`/recipes/${id}/reviews`, review);
      setReviewContent("");
      setReviewRating(5);
      setReviewerName("");
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
      setShowReviewForm(false); // Hide the form after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <Container sx={{ position: "relative", pt: 4, pb: 8 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        Back
      </Button>
      <Typography variant="h3" gutterBottom>
        {recipe.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {recipe.description}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>
      <Typography variant="body1" paragraph>
        {recipe.ingredients}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Instructions
      </Typography>
      <Typography variant="body1" paragraph>
        {recipe.instructions}
      </Typography>
      {Number(userId) === Number(recipe.userID) && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          sx={{ mb: 4 }}
        >
          Delete Recipe
        </Button>
      )}
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      <List>
        {recipe.reviews.map((review) => (
          <ListItem key={review.id} alignItems="flex-start">
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  {review.reviewerName}
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    sx={{ ml: 1 }}
                  />
                </Box>
              }
              secondary={review.content}
            />
          </ListItem>
        ))}
      </List>
      {userId !== recipe.userID && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowReviewForm(!showReviewForm)}
            sx={{ mt: 2 }}
          >
            {showReviewForm ? "Cancel Review" : "Add a Review"}
          </Button>
          {showReviewForm && (
            <Box component="form" onSubmit={handleSubmitReview} sx={{ mt: 4 }}>
              <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
              <TextField
                select
                label="Rating"
                variant="outlined"
                margin="normal"
                fullWidth
                value={reviewRating}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
                required
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Review"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit Review
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default RecipePage;
