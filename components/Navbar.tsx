"use client";
import { Menu, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const categories = [
    { id: "home", label: "Home", route: "/" },
    { id: "diamond-rings", label: "Diamond Rings", route: "/diamond-rings" },
    { id: "pendants", label: "Pendants", route: "/pendants" },
    { id: "earrings", label: "Earrings", route: "/earrings" },
    { id: "contact-us", label: "Contact Us", route: "/contact-us" },
  ];

  const currentPage = pathname === "/" ? "home" : pathname.split("/")[1];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link
            href={"/"}
            className="text-xl sm:text-2xl font-serif font-bold text-gray-900 tracking-wide cursor-pointer"
          >
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="OM JEWEL STUDIO"
                className="w-15 h-15"
              />
              <span className="ml-3">OM JEWEL STUDIO</span>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.route}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === cat.id
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.route}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  currentPage === cat.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
