import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  username: string;
}

interface UserRecord {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    username: string,
    password: string
  ) => { success: boolean; message?: string };
  register: (
    username: string,
    password: string
  ) => { success: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      return {
        success: false,
        message: "Username and password are required.",
      };
    }

    const stored: Record<string, UserRecord> = JSON.parse(
      localStorage.getItem("users") || "{}"
    );

    if (!stored[username] || stored[username].password !== password) {
      return { success: false, message: "Invalid credentials." };
    }

    const newUser = { username };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    return { success: true };
  };

  const register = (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      return {
        success: false,
        message: "Username and password are required.",
      };
    }

    const storedUsers: Record<string, UserRecord> = JSON.parse(
      localStorage.getItem("users") || "{}"
    );

    if (storedUsers[username]) {
      return { success: false, message: "This username already exists." };
    }

    storedUsers[username] = { username, password };
    localStorage.setItem("users", JSON.stringify(storedUsers));

    const newUser = { username };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
