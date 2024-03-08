import React from "react";
import { Navigate } from "react-router-dom";
import { useGetAccountQuery } from "./app/apiSlice";

const HomePageRedirectRoutes = ({ child }) => {
  const { data: account, isLoading } = useGetAccountQuery();

  if (isLoading) return <div>Loading...</div>;

  if (account) {
    return <Navigate to="/" replace />;
  } else {
    return child;
  }
};

export default HomePageRedirectRoutes;
