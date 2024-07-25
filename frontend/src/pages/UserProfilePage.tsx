import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
    <div>
      <h1>{userProfile.fullName}</h1>
      <img src={userProfile.profilePictureUrl} alt={userProfile.fullName} />
      <p>{userProfile.bio}</p>
    </div>
  );
};

export default UserProfilePage;
