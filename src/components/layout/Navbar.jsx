import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Globe2, Phone, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const toursRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (toursRef.current && !toursRef.current.contains(e.target)) {
        setToursOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navBg = isHome && !scrolled ? "bg-transparent" : "bg-white shadow-md";
  const textColor = isHome && !scrolled ? "text-white" : "text-gray-800";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Globe2 className={`w-7 h-7 ${isHome && !scrolled ? "text-orange-300" : "text-orange-500"}`} />
            <span className={`text-xl font-bold tracking-tight ${textColor}`}>
              NMT <span className={isHome && !scrolled ? "text-orange-300" : "text-orange-500"}>India Holidays</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-orange-500 transition-colors ${textColor} ${isActive ? "text-orange-400" : ""}`
              }
            >
              Home
            </NavLink>

            {/* Tours dropdown */}
            <div ref={toursRef} className="relative">
              <button
                onClick={() => setToursOpen((v) => !v)}
                className={`flex items-center gap-1 text-sm font-medium hover:text-orange-500 transition-colors ${textColor} ${location.pathname.startsWith("/tours") ? "text-orange-400" : ""}`}
              >
                Tours
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toursOpen ? "rotate-180" : ""}`} />
              </button>
              {toursOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link
                    to="/tours"
                    onClick={() => setToursOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <Globe2 className="w-4 h-4 text-orange-400" /> All Tours
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    to="/tours?category=Domestic"
                    onClick={() => setToursOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    🇮🇳 Domestic Tours
                  </Link>
                  <Link
                    to="/tours?category=International"
                    onClick={() => setToursOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    ✈️ International Tours
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-orange-500 transition-colors ${textColor} ${isActive ? "text-orange-400" : ""}`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-orange-500 transition-colors ${textColor} ${isActive ? "text-orange-400" : ""}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919697988891"
              className={`flex items-center gap-1 text-sm font-medium ${textColor} hover:text-orange-500 transition-colors`}
            >
              <Phone className="w-4 h-4" />
              +91 96979 88891
            </a>
            <Link
              to="/tours"
              className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg ${textColor}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-orange-500 py-2"
            >
              Home
            </Link>

            {/* Mobile Tours accordion */}
            <div>
              <button
                onClick={() => setMobileToursOpen((v) => !v)}
                className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-orange-500 py-2"
              >
                Tours
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToursOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileToursOpen && (
                <div className="pl-4 space-y-1 pb-1">
                  <Link
                    to="/tours"
                    onClick={() => setOpen(false)}
                    className="block text-gray-600 text-sm hover:text-orange-500 py-1.5"
                  >
                    All Tours
                  </Link>
                  <Link
                    to="/tours?category=Domestic"
                    onClick={() => setOpen(false)}
                    className="block text-gray-600 text-sm hover:text-orange-500 py-1.5"
                  >
                    🇮🇳 Domestic Tours
                  </Link>
                  <Link
                    to="/tours?category=International"
                    onClick={() => setOpen(false)}
                    className="block text-gray-600 text-sm hover:text-orange-500 py-1.5"
                  >
                    ✈️ International Tours
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-orange-500 py-2"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-orange-500 py-2"
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+919697988891"
                className="text-gray-700 font-medium text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> +91 96979 88891
              </a>
              <Link
                to="/tours"
                onClick={() => setOpen(false)}
                className="bg-orange-500 text-white text-center text-sm font-semibold px-4 py-2 rounded-full"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
