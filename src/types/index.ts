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
export interface CategoriesQueryParams {
  items?: number;
  page?: number;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}
export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategory {
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}
