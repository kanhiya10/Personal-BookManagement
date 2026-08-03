import api from "./api";

export const registerUser = (data: any) => {
  return api.post("/users/register", data);
};

export const loginUser = (data: { username: string; email: string; password: string }) => {
  return api.post("/users/login", data);
};

export const logoutUser = () => {
  return api.post("/users/logout");
};

export const getCurrentUser = () => {
  return api.get("/users/me");
};