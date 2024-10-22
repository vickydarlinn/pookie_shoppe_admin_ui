import { FaHotel, FaUsers } from "react-icons/fa";
import { IoHomeSharp, IoRestaurant } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../hooks/useLogoutMutation";
import { useAuthStore } from "../../store";
import { User } from "../../types";
import { Params } from "../../utils/constants";

// const navs = ;

const SideBar = () => {
  const { mutate: logoutMutate } = useLogoutMutation();
  const handleLogout = () => {
    logoutMutate();
  };
  const { user } = useAuthStore();

  const navs = getNavs((user as User).role);
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

const getNavs = (role: string) => {
  const baseNav = [
    {
      name: "Home",
      url: ".",
      icon: <IoHomeSharp />,
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
