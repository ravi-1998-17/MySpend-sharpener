import React from "react";

function Home({ onLogout }) {
  const email = localStorage.getItem("email") || "User";
  return (
    <div className="p-4">
      <h2>Welcome, {email}</h2>
      <p>This is the protected home page.</p>
      <button className="btn btn-outline-danger" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
