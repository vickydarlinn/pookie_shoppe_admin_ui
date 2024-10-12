// import { FaGreaterThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";

import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // Split the pathname and filter out empty strings caused by the leading "/"
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <nav className="flex gap-1 border items-center">
      <Link to="/">Dashboard</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <div key={name} className="flex items-center">
            <span className="">
              <FaGreaterThan />
            </span>
            <Link to={routeTo} className="capitalize">
              {name}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
