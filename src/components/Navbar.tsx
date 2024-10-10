// src/components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 fixed top-0 left-0">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Playground
        </Link>
      </div>
    </nav>
  );
}
