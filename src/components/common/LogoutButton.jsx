import { logout } from "@/store/slices/authSlice";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <button className="btn btn-outline-danger mx-3" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
