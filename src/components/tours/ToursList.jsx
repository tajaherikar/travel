import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { tours } from "../../data/tours";
import TourCard from "../tours/TourCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = ["All", "Domestic", "International"];
const DURATIONS = ["All", "Up to 5 days", "6–8 days", "9+ days"];
const BUDGETS = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹30K", min: 0, max: 30000 },
  { label: "₹30K–₹70K", min: 30000, max: 70000 },
  { label: "Above ₹70K", min: 70000, max: Infinity },
];

function durationDays(durationStr) {
  const match = durationStr.match(/(\d+)\s*Days/i);
  return match ? parseInt(match[1]) : 0;
}

export default function ToursList() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [duration, setDuration] = useState("All");
  const [budget, setBudget] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Sync category filter when URL param changes (e.g. from navbar dropdown)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
    else setCategory("All");
  }, [searchParams]);

  const filtered = tours.filter((t) => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.stops.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || t.category === category;
    const days = durationDays(t.duration);
    const matchDur =
      duration === "All" ||
      (duration === "Up to 5 days" && days <= 5) ||
      (duration === "6–8 days" && days >= 6 && days <= 8) ||
      (duration === "9+ days" && days >= 9);
    const budgetObj = BUDGETS.find((b) => b.label === budget) || BUDGETS[0];
    const matchBudget =
      t.pricing.adult >= budgetObj.min && t.pricing.adult <= budgetObj.max;
    return matchSearch && matchCat && matchDur && matchBudget;
  });

  return (
    <div>
      {/* Search & filter bar */}
      <div className="bg-white sticky top-16 z-30 shadow-sm border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by destination, tour name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-colors ${
                  category === c
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-orange-300 transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1 flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1.5 font-medium">Duration</p>
              <div className="flex gap-2 flex-wrap">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      duration === d
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1.5 font-medium">Budget</p>
              <div className="flex gap-2 flex-wrap">
                {BUDGETS.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setBudget(b.label)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      budget === b.label
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "tour" : "tours"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No tours found</h3>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setDuration("All");
                setBudget("All");
              }}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
