import React from "react";
import { Link } from "react-router-dom";

interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    // add other fields as needed
  };
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
    </div>
  );
};

export default Recipe;
