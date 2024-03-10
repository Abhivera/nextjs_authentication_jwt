import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-zinc-900 ">
      <nav className="w-full py-4 md:w-[80%] mx-auto text-white flex items-center gap-x-3 justify-between">
        <Link href={"/"}>Logo</Link>
        <ul className="flex items-center gap-x-3">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/register"}>Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
