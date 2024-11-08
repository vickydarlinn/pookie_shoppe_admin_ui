import { Outlet } from "react-router-dom";
import { useSelfQuery } from "../../hooks/userSelfQuery";
import { useAuthStore, useThemeStore } from "../../store";
import { useEffect } from "react";

const Root = () => {
  const { setUser } = useAuthStore();
  const { theme } = useThemeStore(); // Access theme from the store

  // Optional: useEffect to respond to theme changes (if needed)
  useEffect(() => {
    // This is handled by the store's DOM update function
  }, [theme]);

  const { data, isLoading } = useSelfQuery();
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default Root;
