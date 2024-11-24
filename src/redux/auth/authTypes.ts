export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null | string;
  token: string | null;
  loading: boolean;
  error: string | null;
}
