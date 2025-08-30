import { createContext, useState, useEffect } from "react";
import { message } from "antd";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const data = res.data;

      setToken(data.accessToken);
      setRole(data.user.userRole);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userRole", data.user.userRole);

      await loadUser(data.accessToken);

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
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    message.success("Đã đăng xuất.");
  };

  const loadUser = async (currentToken = token) => {
    if (!currentToken) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Lỗi khi load user:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (formData) => {
    try {
      const res = await api.put("/auth/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      message.success("Cập nhật thông tin thành công!");
      return res.data;
    } catch (err) {
      message.error("Cập nhật thất bại! " + (err.response?.data?.message || ""));
      throw err;
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
