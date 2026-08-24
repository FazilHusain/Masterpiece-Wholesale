import {
  Menu,
  Search,
  User,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileHeader({
  onMenuOpen,
  onSearchOpen,
}) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ece7df] lg:hidden">

      <div className="h-16 px-4 flex items-center justify-between">

        {/* Left */}

        <button
          onClick={onMenuOpen}
          className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}

        <Link to="/">
          <img
            src="/admin/logo/logo.jpeg"
            alt="His Masterpiece"
            className="h-10 object-contain"
          />
        </Link>

        {/* Right */}

        <div className="flex items-center gap-1">

          <button
            onClick={onSearchOpen}
            className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <Search size={20} />
          </button>

          <Link
            to="/wishlist"
            className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <Heart size={20} />
          </Link>

          <Link
            to="/profile"
            className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <User size={20} />
          </Link>

        </div>

      </div>

    </header>
  );
}