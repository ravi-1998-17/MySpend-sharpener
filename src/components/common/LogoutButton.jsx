import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <button className="btn btn-outline-danger mx-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
