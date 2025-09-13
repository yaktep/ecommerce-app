import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../styles/Profile.css";

const Profile: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Your Profile</h1>
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Please log in to view your profile</p>
      )}
    </div>
  );
};

export default Profile;
