export interface Restaurant {
  id: number;
  name: string;
  address: string;
}

export interface CreateRestaurant {
  name: string;
  address: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  restaurant?: Restaurant;
}
export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  restaurantId?: string;
}
export interface UpdateUser {
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logout: () => void;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserQueryParams {
  items?: number;
  page?: number;
  q?: string;
  role?: string;
}
export interface RestaurantQueryParams {
  items?: number;
  page?: number;
  q?: string;
}
