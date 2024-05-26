"use client"

import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
  // status には、authenticated・unauthenticated・loading のいずれかが格納されます
  const { status } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated" && pathName != "/login")
      // status が unauthenticated の場合でも、現在のパス名が「/login」だった場合、リダイレクトは行いません
      router.push("/login");
  }, [router, status, pathName]);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "authenticated") return children;
};

export default AuthGuard;
