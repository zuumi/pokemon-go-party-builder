"use client";

import React, { useState,useEffect } from "react";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(()=> {
    if (status === "authenticated") {
      redirect("/todo");
    }
  }, [status]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await signIn(provider);

    if (result) {
      redirect("/todo");
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="loader">Loading....</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form action="" className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
        <button
          onClick={handleLogin("google")}
          type="button"
          className="w-full bg-red-500 text-white rounded-lg px-4 py-2"
        >
          Googleでログイン
        </button>
      </form>
    </div>
  )
}
