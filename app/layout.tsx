import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth/next";
import NextAuthProvider from "./providers";

import Header from "../components/Header";
import { nextAuthOptions } from "../lib/next-auth-options";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokémon GO Party",
  description: "Generate PvP Party",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header session={session} />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
