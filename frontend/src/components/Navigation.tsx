import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation: React.FC = () => {
  const { token, userId } = useAuth();

  console.log("Navigation - Token:", token); // Debugging line
  console.log("Navigation - User ID:", userId); // Debugging line

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        {token && userId && (
          <>
            <li>
              <Link to="/add-recipe">Add Recipe</Link>
            </li>
            <li>
              <Link to={`/userprofile/${userId}`}>My Profile</Link>
            </li>
            <li>
              <Link to={`/editprofile/${userId}`}>Edit Profile</Link>
            </li>
          </>
        )}
        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
