import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./UserProfile.css";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-card text-center p-4 mt-5">

      <div className="avatar-lg">
        {user?.username?.charAt(0).toUpperCase()}
      </div>

      <h3 className="mt-3">{user?.username}</h3>

      <small className="text-muted">
        {user ? "Host" : ""}
      </small>
    </div>
  );
}