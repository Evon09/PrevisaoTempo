import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import {
  LoginRequest,
  RegisterRequest,
  getUserLocalStorage,
  setUserLocalStorage,
} from "./utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = { token: response.token, email, id: response.user._id };
    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  async function register(email: string, name: string, password: string) {
    try {
      await RegisterRequest(email, name, password);
    } catch (err) {
      throw err;
    }
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
