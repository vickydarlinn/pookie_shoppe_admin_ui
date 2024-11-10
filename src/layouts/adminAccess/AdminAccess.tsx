import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminAccess = () => {
  const { user } = useAuthStore();
  console.log(user);
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminAccess;
