import React from "react";
import { Link } from "react-router-dom";
// import "../styles/Navigation.css";
import Search from "./Search"; // Import the Search component

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">All Recipes</Link>
        </li>
        <li>
          <Link to="/add-recipe">Add Recipe</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <Search /> {/* Add the Search component */}
    </nav>
  );
};

export default Navigation;
