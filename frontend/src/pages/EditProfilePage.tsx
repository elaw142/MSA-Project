import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
} from "@mui/material";

interface UserProfile {
  id: number;
  userId: number;
  fullName: string;
  bio: string;
  profilePictureUrl: string;
}

const EditProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 0,
    userId: parseInt(userId || "0", 10),
    fullName: "",
    bio: "",
    profilePictureUrl: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/userprofile/${userId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/userprofile/${userId}`, userProfile);
      navigate(`/userprofile/${userId}`);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Failed to update user profile");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Full Name"
                name="fullName"
                value={userProfile.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Bio"
                name="bio"
                value={userProfile.bio}
                onChange={handleChange}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Profile Picture URL"
                name="profilePictureUrl"
                value={userProfile.profilePictureUrl}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfilePage;
