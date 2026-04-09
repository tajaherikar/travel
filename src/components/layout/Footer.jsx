import { Link } from "react-router-dom";
import { Globe2, Phone, Mail, MapPin, Share2, Camera, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Globe2 className="w-7 h-7 text-orange-400" />
              <span className="text-white text-xl font-bold">
                NMT <span className="text-orange-400">India Holidays</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 mb-1">Northern Mediterranean Tourism India</p>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Creating unforgettable journeys across India, Asia and the Mediterranean. Travel more, worry less — we handle every detail.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: "https://www.facebook.com/nmtindiaSangli", label: "Facebook" },
                { icon: Camera, href: "https://www.instagram.com/nmt_india_holidays", label: "Instagram" },
                { icon: X, href: "https://x.com/nmtindia_tours", label: "X" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "All Tours", to: "/tours" },
                { label: "Domestic Tours", to: "/tours?category=Domestic" },
                { label: "International Tours", to: "/tours?category=International" },
                { label: "About Us", to: "/about" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Bali, Indonesia",
                "Singapore",
                "Thailand",
                "Malaysia",
                "Kerala, India",
                "Rajasthan, India",
                "Himachal Pradesh",
              ].map((dest) => (
                <li key={dest} className="hover:text-orange-400 transition-colors cursor-pointer">
                  {dest}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Office No.106/107, First Floor, Shiv Platino, Opp. Khare Mangal Karyalaya Parking, Vishrambag, Sangli 416 415 (MS) INDIA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919697988891" className="hover:text-orange-400 transition-colors">+91 96979 88891</a>
                  <a href="tel:+919697988893" className="hover:text-orange-400 transition-colors">+91 96979 88893</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:info@nmtindiaholidays.com" className="hover:text-orange-400 transition-colors">
                  info@nmtindiaholidays.com
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-green-900/40 rounded-lg border border-green-700/40">
              <p className="text-green-400 text-xs font-medium mb-1">WhatsApp Support</p>
              <a
                href="https://wa.me/919697988892"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-green-400 transition-colors"
              >
                Chat with us → +91 96979 88892
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 NMT India Holidays (Northern Mediterranean Tourism India). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
