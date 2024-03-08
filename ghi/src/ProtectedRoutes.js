import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useGetAccountQuery } from "./app/apiSlice";

const ProtectedRoutes = ({ child }) => {
  const { data: account, isLoading } = useGetAccountQuery();

  const location = useLocation();
  const { account_id } = useParams();

  if (isLoading) return <div>Loading...</div>;

  if (!account) {
    return <Navigate to="/login/" replace />;
  } else if (
    location.pathname === `/accounts/${account_id}/posts` &&
    Number(account_id) === account.id

  ) {
    return <Navigate to="/mypage/" replace />;
  } else {
    return child;
  }
};

export default ProtectedRoutes;

