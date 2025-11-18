import { logout } from "@/store/slices/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function LogoutButton() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme); // dark / light

  const logoutHandler = () => {
    dispatch(logout());
  };

  const styles = {
    padding: "6px 14px",
    borderRadius: "8px",
    fontWeight: 600,
    transition: "0.3s",
    background: "transparent",

    // LIGHT THEME
    ...(theme === "light" && {
      color: "var(--pink)",
      border: "2px solid var(--pink)",
    }),

    // DARK THEME
    ...(theme === "dark" && {
      color: "var(--light)",
      border: "2px solid var(--light)",
    }),
  };

  return (
    <button
      style={styles}
      onClick={logoutHandler}
      onMouseEnter={(e) => {
        e.target.style.background = "var(--pink)";
        e.target.style.color = theme === "dark" ? "var(--dark)" : "var(--light)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "transparent";
        e.target.style.color =
          theme === "dark" ? "var(--light)" : "var(--pink)";
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
