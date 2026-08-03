"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// import Spinner from "@/components/Spinner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user]);

  if (loading) return 'Loading...';

   return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {children}
    </div>
  );
}

