import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store";
import SideBar from "../../components/sideBar";
import Header from "../../components/header";

const Dashboard = () => {
  const { user } = useAuthStore();
  console.log(user);
  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
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
