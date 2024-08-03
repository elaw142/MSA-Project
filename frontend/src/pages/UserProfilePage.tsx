import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Avatar,
} from "@mui/material";

interface UserProfile {
  id: number;
  userId: number;
  fullName: string;
  bio: string;
  profilePictureUrl: string;
}

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Avatar
            alt={userProfile.fullName}
            src={userProfile.profilePictureUrl}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            {userProfile.fullName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {userProfile.bio}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/editprofile/${userId}`}
            sx={{ marginTop: 2 }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;
