import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1643449416258-5c8e7ec598b1?q=80&w=1740&auto=format&fit=crop",
    title: "Incredible Kashmir",
    sub: "Snow-capped peaks, Dal Lake and valleys in bloom",
  },
  {
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=80",
    title: "Royal Rajasthan",
    sub: "Palaces, forts and golden deserts",
  },
  {
    img: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1600&q=80",
    title: "Thailand Awaits",
    sub: "Tropical islands, temples and street food",
  },
  {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
    title: "Discover Bali",
    sub: "Temples, beaches and rice terraces await",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${s.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <span className="inline-block bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 text-orange-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          🌍 Explore the world with us
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          {slides[active].title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-xl">
          {slides[active].sub}
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/95 backdrop-blur text-gray-800 placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Link
            to={`/tours${search ? `?search=${encodeURIComponent(search)}` : ""}`}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Search Tours
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            to="/tours"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full text-sm hover:bg-orange-50 transition-colors shadow-lg"
          >
            View All Tours
          </Link>
          <Link
            to="/tours"
            className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full text-sm hover:bg-orange-600 transition-colors shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === active ? "bg-orange-400 w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll down indicator */}
      <a
        href="#featured"
        className="absolute bottom-10 right-6 z-10 text-white/60 hover:text-white flex flex-col items-center gap-1 text-xs"
      >
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
