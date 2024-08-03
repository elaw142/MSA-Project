import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import AddRecipePage from "./pages/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllRecipesPage from "./pages/AllRecipesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import Navigation from "./components/Navigation";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <Navigation toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<AllRecipesPage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route
              path="/add-recipe"
              element={
                <PrivateRoute>
                  <AddRecipePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-recipe/:id"
              element={
                <PrivateRoute>
                  <EditRecipePage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route
              path="/userprofile/:userId"
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/editprofile/:userId"
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default App;
