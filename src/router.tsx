import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import Dashboard from "./layouts/dashboard";
import NonAuth from "./layouts/nonAuth";
import Root from "./layouts/root";
import UsersPage from "./pages/usersPage";
import RestaurantPage from "./pages/restaurantPage";
import CategoryPage from "./pages/categoryPage";
import ProductPage from "./pages/productPage";
import AdminAccess from "./layouts/adminAccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <AdminAccess />,
            children: [
              {
                path: "users",
                element: <UsersPage />,
              },
              {
                path: "categories",
                element: <CategoryPage />,
              },
              {
                path: "restaurants",
                element: <RestaurantPage />,
              },
            ],
          },
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "products",
            element: <ProductPage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
