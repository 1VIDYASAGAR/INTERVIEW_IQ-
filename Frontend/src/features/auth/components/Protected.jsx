import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../../interview/style/loading.scss";
const Protected = ({ children }) => {
  const { loading, user } = useAuth();


if (loading) {
  return (
    <main className="loading-page">
      <div className="loading-glow"></div>

      <div className="loading-spinner"></div>

      <h1 className="loading-title">
        Loading...
      </h1>

    </main>
  );
}


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;