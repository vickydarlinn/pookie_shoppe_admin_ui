import {
  CreateRestaurant,
  CreateUser,
  Credentials,
  RestaurantQueryParams,
  UpdateUser,
  UserQueryParams,
} from "../types";
import api from "./client";

// self
export const login = async (credentials: Credentials) =>
  api.post("/auth/login", credentials);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");

// users
export const getAllUsers = ({ page, items, q, role }: UserQueryParams) => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (items) params.append("items", String(items));
  if (q) params.append("q", q); // Add the search query
  if (role) params.append("role", role); // Add the role filter

  return api.get(`/users?${params.toString()}`);
};
export const createNewUser = (userData: CreateUser) =>
  api.post("/users", userData);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
export const updateUser = (id: string, userData: UpdateUser) =>
  api.patch(`/users/${id}`, userData);

// restaurants
export const getAllRestaurants = ({
  page,
  items,
  q,
}: RestaurantQueryParams) => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (items) params.append("items", String(items));
  if (q) params.append("q", q);

  return api.get(`/restaurants?${params.toString()}`);
};
export const createNewRestaurant = (restaurantData: CreateRestaurant) =>
  api.post("/restaurants", restaurantData);
export const deleteRestaurant = (id: string) =>
  api.delete(`/restaurants/${id}`);
export const updateRestaurant = (
  id: string,
  restaurantData: CreateRestaurant
) => api.patch(`/restaurants/${id}`, restaurantData);
