import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { tours } from "../data/tours";
import TourMap from "../components/tours/TourMap";
import Itinerary from "../components/tours/Itinerary";
import PricingSection from "../components/tours/PricingSection";
import BookingForm from "../components/booking/BookingForm";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Share2,
  Heart,
} from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const TABS = ["Overview", "Itinerary", "Map", "Pricing", "Book Now"];

export default function TourDetailPage() {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!tour) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-6xl mb-4">🗺️</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tour Not Found</h2>
        <p className="text-gray-500 mb-6">
          The tour you're looking for doesn't exist.
        </p>
        <Link
          to="/tours"
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          Browse All Tours
        </Link>
      </div>
    );
  }

  // Build pricing object with inclusions/exclusions merged in
  const pricingWithDetails = {
    ...tour.pricing,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Image Gallery */}
      <div className="relative bg-gray-900">
        <div className="h-72 sm:h-96 overflow-hidden">
          <img
            src={tour.gallery[activeImage]}
            alt={tour.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        {/* Thumbnail strip */}
        {tour.gallery.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {tour.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeImage ? "border-orange-400 scale-110" : "border-transparent opacity-70"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Back button */}
        <Link
          to="/tours"
          className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 hover:bg-black/70 text-white text-sm px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tours
        </Link>

        {/* Save & Share */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${saved ? "fill-red-400 text-red-400" : "text-white"}`}
            />
          </button>
          <button
            onClick={() => navigator.share?.({ title: tour.title, url: window.location.href })}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Tour Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                    tour.category === "International"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {tour.category}
                </span>
                {tour.trending && (
                  <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    🔥 Trending
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-400" /> {tour.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  {tour.startLocation} → {tour.endLocation}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  {formatDate(tour.startDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {tour.rating} ({tour.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
              <p className="text-3xl font-extrabold text-orange-600">
                ₹{(tour.pricing.adult).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-400">per person</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-0 no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "Overview" && (
              <>
                {/* Highlights */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tour Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tour.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tour Stops */}
                <TourMap stops={tour.stops} />

                {/* Quick itinerary preview */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Itinerary at a Glance
                  </h3>
                  <div className="space-y-3">
                    {tour.itinerary.slice(0, 3).map((d, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <div className="w-8 h-8 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center text-xs font-bold text-orange-600 shrink-0">
                          {d.day}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {d.title}
                          </p>
                          <p className="text-xs text-gray-500">{d.location}</p>
                        </div>
                      </div>
                    ))}
                    {tour.itinerary.length > 3 && (
                      <button
                        onClick={() => setActiveTab("Itinerary")}
                        className="text-sm text-orange-500 font-semibold hover:text-orange-700 transition-colors"
                      >
                        + {tour.itinerary.length - 3} more days →
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === "Itinerary" && (
              <Itinerary itinerary={tour.itinerary} />
            )}

            {activeTab === "Map" && <TourMap stops={tour.stops} />}

            {activeTab === "Pricing" && (
              <PricingSection pricing={pricingWithDetails} />
            )}

            {activeTab === "Book Now" && <BookingForm tour={tour} />}
          </div>

          {/* Sidebar — always visible */}
          <div className="space-y-6">
            {/* Booking form (hidden on Book Now tab since it's in main) */}
            {activeTab !== "Book Now" && <BookingForm tour={tour} />}

            {/* Quick info */}
            {activeTab === "Book Now" && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3 text-sm">
                <h4 className="font-bold text-gray-900">Tour Summary</h4>
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Start</span>
                    <span className="font-medium">{tour.startLocation}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">End</span>
                    <span className="font-medium">{tour.endLocation}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Departure</span>
                    <span className="font-medium">{formatDate(tour.startDate)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Adult price</span>
                    <span className="font-bold text-orange-600">
                      ₹{tour.pricing.adult.toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Hi! I'm interested in the ${tour.title} tour.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
