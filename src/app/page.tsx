"use client";

import HeroClient from "@/components/HeroClient";
import { useAuth } from "@/lib/firebase/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  return <HeroClient loggedIn={!!user} />;
}
