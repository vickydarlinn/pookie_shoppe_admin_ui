import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store";
import SideBar from "../../components/sideBar";
import Header from "../../components/header";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  if (user === null) {
    return (
      <Navigate
        to={`/auth/login?redirect=${location.pathname}`}
        replace={true}
      />
    );
  }
  return (
    <main className="flex">
      <SideBar />

      <div className="grow">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
