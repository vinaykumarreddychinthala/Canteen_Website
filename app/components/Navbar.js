import Link from "next/link";
import Image from "next/image";
import cartimage from "../images/shopping-cart.png";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between px-2 sm:px-4 py-2 bg-lime-500 shadow-md w-full">
      <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 items-center">
        <Link
          href="/"
          className="text-white font-semibold hover:underline transition"
        >
          Home
        </Link>
        <Link
          href="/About"
          className="text-white font-semibold hover:underline transition"
        >
          About
        </Link>
        <Link
          href="/Menu"
          className="text-white font-semibold hover:underline transition"
        >
          Menu
        </Link>
        <Link
          href="/placed_order"
          className="text-white font-semibold hover:underline transition"
        >
          Orders
        </Link>
      </div>
      <div className="mt-2 sm:mt-0">
        <Link href="/Cart" className="flex items-center group">
          <Image
            src={cartimage}
            alt="Cart"
            width={30}
            height={30}
            className="transition-transform group-hover:scale-110"
          />
          <span className="sr-only">Cart</span>
        </Link>
      </div>
    </nav>
  );
}