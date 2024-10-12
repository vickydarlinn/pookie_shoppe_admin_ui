import { FaHotel, FaUsers } from "react-icons/fa";
import { IoHomeSharp, IoRestaurant } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../hooks/useLogoutMutation";

const navs = [
  {
    name: "Home",
    url: ".",
    icon: <IoHomeSharp />,
  },
  {
    name: "Users",
    url: "users",
    icon: <FaUsers />,
  },
  {
    name: "Restaurants",
    url: "restaurants",
    icon: <FaHotel />,
  },
  {
    name: "Products",
    url: "products",
    icon: <IoRestaurant />,
  },
];

const SideBar = () => {
  const { mutate: logoutMutate } = useLogoutMutation();
  const handleLogout = () => {
    logoutMutate();
  };
  return (
    <nav className="min-w-40 h-screen border flex flex-col ">
      <div>Logo</div>

      <div className="mt-10">
        {navs?.map((nav) => (
          <div key={nav.url} className="flex gap-1 border items-center p-1">
            {nav.icon}
            <NavLink to={nav.url}>{nav.name}</NavLink>
          </div>
        ))}
      </div>

      <div onClick={handleLogout} className="mt-auto cursor-pointer">
        Logout
      </div>
    </nav>
  );
};

export default SideBar;
