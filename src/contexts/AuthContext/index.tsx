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
  signOut: () => Promise<void>;
  userUpdate: (user: User) => Promise<void>;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

function AuthProvider({ children }: Props) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      const res = await api.post("/sessions", { email, password });

      const { token, user } = res.data;

      api.defaults.headers.common = { Authorization: `bearer ${token}` };

      const userCollection = database.get<ModelUser>("users");
      await database.action(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.avatar = user.avatar),
            (newUser.driver_license = user.driver_license),
            (newUser.token = token);
        });
      });

      setData({ ...user, token });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const signOut = async () => {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
        setData({} as User);
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const userUpdate = async (user: User) => {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.action(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<ModelUser>("users");
      const res = await userCollection.query().fetch();

      if (res.length > 0) {
        const userData = res[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, userUpdate, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
