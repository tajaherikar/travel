import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Globe2, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/tours", label: "Tours" },
    { to: "/tours?category=Domestic", label: "Domestic" },
    { to: "/tours?category=International", label: "International" },
    { to: "/about", label: "About Us" },
  ];

  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white shadow-md";

  const textColor =
    isHome && !scrolled ? "text-white" : "text-gray-800";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Globe2
              className={`w-7 h-7 ${
                isHome && !scrolled ? "text-orange-300" : "text-orange-500"
              }`}
            />
            <span
              className={`text-xl font-bold tracking-tight ${textColor}`}
            >
              NMT <span className={isHome && !scrolled ? "text-orange-300" : "text-orange-500"}>India Holidays</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-orange-500 transition-colors ${textColor} ${
                    isActive && l.to === "/" && location.pathname === "/"
                      ? "text-orange-400"
                      : ""
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
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
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium hover:text-orange-500 py-1"
              >
                {l.label}
              </Link>
            ))}
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
