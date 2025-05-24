import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute - user:", user, "loading:", loading);
  if (loading) return <div>Yükleniyor...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
}
