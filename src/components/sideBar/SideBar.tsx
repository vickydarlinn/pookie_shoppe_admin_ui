import { FaHotel, FaUsers } from "react-icons/fa";
import { IoHomeSharp, IoRestaurant } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../hooks/useLogoutMutation";
import { useAuthStore } from "../../store";
import { User } from "../../types";
import { Params } from "../../utils/constants";
import { MdCategory } from "react-icons/md";
import { Button } from "../ui/button";

const SideBar = () => {
  const { mutate: logoutMutate } = useLogoutMutation();
  const handleLogout = () => {
    logoutMutate();
  };
  const { user } = useAuthStore();

  const navs = getNavs((user as User).role);
  return (
    <nav className="min-w-44 h-screen  p-1 flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-2 font-bold text-lg text-primary text-center">
        Pookie Shoppie
      </div>

      <div className="mt-10 px-1 space-y-2">
        {navs?.map((nav) => (
          <NavLink
            className={({ isActive }) =>
              `flex gap-2 items-center p-1 px-2 rounded-md ${
                isActive ? "bg-background text-foreground" : ""
              }`
            }
            key={nav.url}
            to={nav.url}
          >
            {nav.icon}

            {nav.name}
          </NavLink>
        ))}
      </div>

      <Button
        onClick={handleLogout}
        className="mt-auto bg-primary text-primary-foreground  "
      >
        Logout
      </Button>
    </nav>
  );
};

const getNavs = (role: string) => {
  const baseNav = [
    {
      name: "Home",
      url: ".",
      icon: <IoHomeSharp />,
    },
    {
      name: "Categories",
      url: "categories",
      icon: <MdCategory />,
    },
    {
      name: "Products",
      url: "products",
      icon: <IoRestaurant />,
    },
  ];

  if (role === "admin") {
    const menus = [...baseNav];
    menus.splice(1, 0, {
      name: "Users",
      url: `users?page=${Params.DEFAULT_PAGE}`,
      icon: <FaUsers />,
    });
    menus.splice(2, 0, {
      name: "Restaurants",
      url: `restaurants?page=${Params.DEFAULT_PAGE}`,
      icon: <FaHotel />,
    });

    return menus;
  }

  return baseNav;
};
export default SideBar;
