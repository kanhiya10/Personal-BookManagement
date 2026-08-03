import axios from "axios";
import { useRouter } from "next/navigation";
import {useAuth} from "@/context/AuthContext";


const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true, // if using cookies
});


const refreshAccessToken = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/refresh-token`,
    {},
    { withCredentials: true }
  );
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh tokennnnn failed:", refreshError);
        const { removeUser } = useAuth();
        removeUser();
        const router = useRouter();
        router.replace("/auth/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;