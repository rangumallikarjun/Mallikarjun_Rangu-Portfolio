"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const authorized = !!user && (!adminEmail || user.email === adminEmail);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/admin/login");
      return;
    }
    if (adminEmail && user.email !== adminEmail) {
      signOut(auth).then(() => router.replace("/admin/login"));
    }
  }, [loading, user, router]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-muted text-sm uppercase tracking-widest">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}
