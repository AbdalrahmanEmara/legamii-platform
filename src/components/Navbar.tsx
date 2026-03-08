import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="boorder-gray-700 fixed top-0 flex w-full items-center justify-around border-b bg-black px-24 py-5">
      <Link href="/" className="transition duration-300 hover:scale-110">
        <Image width="16" height="16" src="public/logo.png" alt="logo" />
      </Link>

      <ul className="flex gap-10 text-lg">
        <Link href="/" className="text-gray-300 transition-colors hover:text-white">
          Home
        </Link>

        <Link href="/contest" className="text-gray-300 transition-colors hover:text-white">
          Contest
        </Link>

        <Link href="/practice" className="text-gray-300 transition-colors hover:text-white">
          Practice
        </Link>

        <Link href="/AI" className="text-gray-300 transition-colors hover:text-white">
          AI Chat
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
