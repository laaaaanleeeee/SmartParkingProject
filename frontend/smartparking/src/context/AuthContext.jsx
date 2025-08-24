import { createContext, useState, useEffect } from "react";
import { message } from "antd";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const data = res.data;

      setToken(data.accessToken);
      setRole(data.user.userRole);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userRole", data.user.userRole);

      message.success("Đăng nhập thành công!");
    } catch (err) {
      message.error("Đăng nhập thất bại! " + (err.response?.data?.message || ""));
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      message.success("Đăng ký thành công!");
      return res.data;
    } catch (err) {
      message.error("Đăng ký thất bại! " + (err.response?.data?.message || ""));
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    message.success("Đã đăng xuất.");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
