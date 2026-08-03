
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  redirect("/dashboard");
}