import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
