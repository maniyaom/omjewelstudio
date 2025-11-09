import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 sm:mt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="OM JEWEL STUDIO"
                className="w-15 h-15"
              />
              <h3 className="ml-3 text-xl sm:text-2xl font-serif font-bold mb-4">
                OM JEWEL STUDIO
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Exquisite jewelry crafted with passion and precision for those who
              appreciate timeless elegance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href={"/"} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/diamond-rings"}
                  className="hover:text-white transition-colors"
                >
                  Diamond Rings
                </Link>
              </li>
              <li>
                <Link
                  href={"/pendants"}
                  className="hover:text-white transition-colors"
                >
                  Pendants
                </Link>
              </li>
              <li>
                <Link
                  href={"/earrings"}
                  className="hover:text-white transition-colors"
                >
                  Earrings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href={"contact-us"}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors"></a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 OM JEWEL STUDIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
