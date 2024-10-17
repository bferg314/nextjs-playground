import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Playground
        </Link>
        <div className="space-x-4">
          <Link
            href="/playground/calculator"
            className="hover:text-gray-300 transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/playground/bouncing-pixels"
            className="hover:text-gray-300 transition-colors"
          >
            Bouncing Pixels
          </Link>
        </div>
      </div>
    </nav>
  );
}
