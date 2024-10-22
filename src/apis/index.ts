import {
  CreateRestaurant,
  CreateUser,
  Credentials,
  UpdateUser,
  UserQueryParams,
} from "../types";
import api from "./client";

export const login = async (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

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

export const getAllRestaurants = () => api.get("/restaurants");

export const createNewRestaurant = (restaurantData: CreateRestaurant) =>
  api.post("/restaurants", restaurantData);

export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export const updateUser = (id: string, userData: UpdateUser) =>
  api.patch(`/users/${id}`, userData);
