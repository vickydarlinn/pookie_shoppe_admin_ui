import { Outlet } from "react-router-dom";
import { useSelfQuery } from "../../hooks/userSelfQuery";
import { useAuthStore } from "../../store";
import { useEffect } from "react";

const Root = () => {
  const { setUser } = useAuthStore();

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
