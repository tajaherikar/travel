import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Star, UtensilsCrossed, BedDouble, Bus, Camera } from "lucide-react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TourCard({ tour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={tour.coverImage}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold uppercase px-3 py-1 rounded-full ${
            tour.category === "International"
              ? "bg-blue-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {tour.category}
        </span>
        {tour.trending && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            🔥 Trending
          </span>
        )}
        {/* Rating overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{tour.rating}</span>
          <span className="text-white/70">({tour.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 leading-snug">
          {tour.title}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="truncate">
              {tour.startLocation} → {tour.endLocation}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Next: {formatDate(tour.nextDeparture)}</span>
          </div>
        </div>

        {/* Route stops */}
        <div className="flex items-center gap-1 flex-wrap mb-4">
          {tour.stops.slice(0, 4).map((stop, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
                {stop}
              </span>
              {i < Math.min(tour.stops.length - 1, 3) && (
                <span className="text-gray-300 text-xs">→</span>
              )}
            </span>
          ))}
          {tour.stops.length > 4 && (
            <span className="text-xs text-gray-400">+{tour.stops.length - 4} more</span>
          )}
        </div>

        {/* Inclusions band */}
        <div className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-2.5 mb-4">
          {[
            { icon: UtensilsCrossed, label: "Meals" },
            { icon: BedDouble, label: "Stay" },
            { icon: Bus, label: "Transport" },
            { icon: Camera, label: "Sightseeing" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] text-gray-500 font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
            <p className="text-xl font-extrabold text-orange-600">
              {formatCurrency(tour.pricing.adult)}
            </p>
            <p className="text-xs text-gray-400">per person</p>
          </div>
          <Link
            to={`/tours/${tour.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
