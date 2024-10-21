import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();

  // Get the redirect path from the search params
  const redirect = searchParams.get("redirect");
  // If the user is authenticated, redirect to the intended path or fallback to "/"
  if (user !== null) {
    return <Navigate to={redirect || "/"} replace={true} />;
  }

  return <Outlet />;
};

export default NonAuth;
