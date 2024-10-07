import { useEffect, useState } from "react";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import { useSelfQuery } from "../../hooks/userSelfQuery";
import { usePermission } from "../../hooks/useHasPermission";
import { useAuthStore } from "../../store";
import { useLogoutMutation } from "../../hooks/useLogoutMutation";

const LoginPage = () => {
  const { isAllowed } = usePermission();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const {
    mutate: LoginMutate,
    isPending,
    error,
    isError,
    isSuccess: isLoginSuccess,
  } = useLoginMutation();
  const { mutate: LogoutMutate } = useLogoutMutation();
  const {
    refetch: fetchUserInfo,
    data: userData,
    isSuccess: isUserInfoFetched,
  } = useSelfQuery();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (isLoginSuccess) {
      fetchUserInfo();
    }
  }, [isLoginSuccess, fetchUserInfo]);

  useEffect(() => {
    if (isUserInfoFetched) {
      if (!isAllowed(userData)) {
        return LogoutMutate();
      }
      setUser(userData);
    }
  }, [userData, isUserInfoFetched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginMutate(userCredentials);
  };
  return (
    <main className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-gray-600 p-2 rounded-lg"
      >
        <h1 className="text-center">Login Page</h1>
        <input
          className="border border-gray-400"
          type="email"
          placeholder="abc@gmail.com"
          onChange={handleChange}
          name="email"
          value={userCredentials.email}
        />
        <input
          className="border border-gray-400"
          type="password"
          placeholder="secret****"
          onChange={handleChange}
          name="password"
          value={userCredentials.password}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-2 mt-2"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
        {isError && <p className="text-red-500">{error.message}</p>}
      </form>
    </main>
  );
};

export default LoginPage;
