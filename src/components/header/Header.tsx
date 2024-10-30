import { useAuthStore } from "../../store";
import { FaBell } from "react-icons/fa";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <div className="flex items-center justify-between border ">
      <div>
        {user?.role === "admin" ? "You are a admin" : user?.restaurant?.name}
      </div>
      <FaBell />
    </div>
  );
};

export default Header;
