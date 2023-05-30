import React, { useState, createContext, useEffect } from "react";

import api from "../../services/api";
import { database } from "../../database";

import { User as ModelUser } from "../../database/models/User";

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: LoginCredentials) {
    try {
      const res = await api.post("/sessions", { email, password });

      const { token, user } = res.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>("users");
      await database.action(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.avatar = user.avatar),
            (newUser.driver_license = user.driver_license),
            (newUser.token = user.token);
        });
      });

      setData({ ...user, token });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(String(error));
      }
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<ModelUser>("users");
      const res = await userCollection.query().fetch();

      if (res.length > 0) {
        const userData = res[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    };
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
