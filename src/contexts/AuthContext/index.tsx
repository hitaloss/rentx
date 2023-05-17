import React, { useState, createContext } from "react";

import api from "../../services/api";

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: LoginCredentials) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

function AuthProvider({ children }: Props) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: LoginCredentials) {
    try {
      const res = await api.post("/sessions", { email, password });

      const { token, user } = res.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
