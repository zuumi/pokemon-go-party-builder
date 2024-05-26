"use client";

import Image from "next/image";
import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-xl text-black"><Link href="/">PokemonGO Party</Link></div>
        <div className="flex items-center">
          <a href="/" className="text-gray-700 hover:text-gray-900 mx-2">Create</a>
          <ul className="flex items-center space-x-4">
            {session ? (
              <>
                <li>
                  <Image
                    src={session.user?.image ?? ""}
                    alt={session.user?.name ?? ""}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600"
                  >
                    ログアウト
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">
                  <button className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600">
                    ログイン
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}