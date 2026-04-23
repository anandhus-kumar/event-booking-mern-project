import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import api from "../utils/axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      const { data } = await api.post("/auth/login", userData);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, verifyOtp, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
