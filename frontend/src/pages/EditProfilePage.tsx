import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

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
      console.log("Sending user profile data:", userProfile);
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
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={userProfile.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={userProfile.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile Picture URL</label>
          <input
            type="text"
            name="profilePictureUrl"
            value={userProfile.profilePictureUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
