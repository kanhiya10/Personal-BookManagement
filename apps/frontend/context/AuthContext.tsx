"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {getCurrentUser,logoutUser} from "@/service/user";
import {UserType, AuthContextType} from "@/types/types"



const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

   const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Call it when the provider mounts
  useEffect(() => {
    fetchCurrentUser();
  }, []);

   const login = (user: UserType) => {
    setUser(user);
  };

 const logout = async () => {
  try {
    await logoutUser();
  } finally {
    setUser(null);
  }
};

const removeUser = () => {
  setUser(null);
}


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        fetchCurrentUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}