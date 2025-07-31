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
    const errorMessage = error.response?.data?.message || "Error en el login";
    throw new Error(errorMessage);
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
    const errorMessage = error.response?.data?.message || "Error en el registro";
    throw new Error(errorMessage);
  }
};

const validateToken = async () => {
  try {
    const res = await api.get("/auth/validate");
    return res.data;
  } catch (error) {
    logout();
    throw new Error("Token inválido");
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
