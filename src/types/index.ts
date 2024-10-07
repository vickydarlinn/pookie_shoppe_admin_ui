export interface Tenant {
  id: number;
  name: string;
  address: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: Tenant;
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
