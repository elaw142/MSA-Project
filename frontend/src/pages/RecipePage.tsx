import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  reviews: Review[];
}

interface Review {
  id: number;
  reviewerName: string;
  content: string;
  rating: number;
}

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState("");
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
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <button onClick={handleDelete}>Delete Recipe</button>
      <h3>Reviews</h3>
      <ul>
        {recipe.reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.reviewerName}</strong> ({review.rating}/5):{" "}
            {review.content}
          </li>
        ))}
      </ul>
      <h3>Add a Review</h3>
      <form onSubmit={handleSubmitReview}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating</label>
          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(parseInt(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Review</label>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default RecipePage;
