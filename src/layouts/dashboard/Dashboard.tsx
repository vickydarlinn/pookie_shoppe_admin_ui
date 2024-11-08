import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store";
import SideBar from "../../components/sideBar";
import Header from "../../components/header";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  if (user === null) {
    // Properly encode the redirect path to preserve query parameters
    const redirectPath = encodeURIComponent(`${location.pathname}`);

    return (
      <Navigate to={`/auth/login?redirect=${redirectPath}`} replace={true} />
    );
  }

  return (
    <main className="flex">
      <SideBar />
      <div className="grow p-3 overflow-hidden rounded-md">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
