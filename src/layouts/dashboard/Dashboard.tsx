import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store";

const Dashboard = () => {
  const { user } = useAuthStore();
  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <main>
      you are authorized
      <Outlet />
    </main>
  );
};

export default Dashboard;
