import {
  CategoriesQueryParams,
  CreateCategory,
  CreateRestaurant,
  CreateUser,
  Credentials,
  RestaurantQueryParams,
  UpdateUser,
  UserQueryParams,
} from "../types";
import api from "./client";

export const AUTH_SERVICE = "/api/auth";
export const CATALOG_SERVICE = "/api/catalog";
export const ORDER_SERVICE = "/api/order";

// self
export const login = async (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);
export const self = () => api.get(AUTH_SERVICE + "/auth/self");
export const logout = () => api.post(AUTH_SERVICE + "/auth/logout");

// users
export const getAllUsers = ({ page, items, q, role }: UserQueryParams) => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (items) params.append("items", String(items));
  if (q) params.append("q", q); // Add the search query
  if (role) params.append("role", role); // Add the role filter

  return api.get(AUTH_SERVICE + `/users?${params.toString()}`);
};
export const createNewUser = (userData: CreateUser) =>
  api.post(AUTH_SERVICE + "/users", userData);
export const deleteUser = (id: string) =>
  api.delete(`${AUTH_SERVICE}/users/${id}`);
export const updateUser = (id: string, userData: UpdateUser) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, userData);

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

  return api.get(`${AUTH_SERVICE}/restaurants?${params.toString()}`);
};
export const createNewRestaurant = (restaurantData: CreateRestaurant) =>
  api.post(AUTH_SERVICE + "/restaurants", restaurantData);
export const deleteRestaurant = (id: string) =>
  api.delete(`${AUTH_SERVICE}/restaurants/${id}`);
export const updateRestaurant = (
  id: string,
  restaurantData: CreateRestaurant
) => api.patch(`${AUTH_SERVICE}/restaurants/${id}`, restaurantData);

// categories
export const getAllCategories = ({ page, items }: CategoriesQueryParams) => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (items) params.append("items", String(items));

  return api.get(`${CATALOG_SERVICE}/categories?${params.toString()}`);
};

export const deleteCategory = (id: string) =>
  api.delete(`${CATALOG_SERVICE}/categories/${id}`);

export const createNewCategory = (categoryData: CreateCategory) =>
  api.post(`${CATALOG_SERVICE}/categories`, categoryData);

export const updateCategory = (
  id: string,
  categoryData: Partial<CreateCategory>
) => api.put(`${CATALOG_SERVICE}/categories/${id}`, categoryData);
