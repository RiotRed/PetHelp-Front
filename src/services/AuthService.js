import api from './api';

const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en el login");
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
};

const getToken = () => localStorage.getItem("token");

const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const setUserInfo = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

const register = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en el registro");
  }
};

const validateToken = async () => {
  try {
    const res = await api.get("/auth/validate");
    return res.data;
  } catch (error) {
    logout();
    throw error;
  }
};

export default { 
  login, 
  logout, 
  getToken, 
  getUserInfo, 
  setUserInfo, 
  register,
  validateToken
};
