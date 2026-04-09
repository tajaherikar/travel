import { useState } from "react";
import { ChevronDown, ChevronUp, Utensils, MapPin } from "lucide-react";

export default function Itinerary({ itinerary }) {
  const [openDay, setOpenDay] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Day-by-Day Itinerary</h3>
        <p className="text-sm text-gray-500 mt-1">
          Click each day to expand details
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {itinerary.map((day, i) => {
          const isOpen = openDay === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenDay(isOpen ? -1 : i)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
              >
                {/* Day number */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isOpen
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-orange-600 border border-orange-200"
                  }`}
                >
                  {day.day}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    Day {day.day} – {day.title}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {day.location}
                  </p>
                </div>

                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 ml-14 border-t border-orange-50 bg-orange-50/30">
                  <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">
                    {day.description}
                  </p>

                  {/* Activities */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Activities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {day.activities.map((act, j) => (
                        <span
                          key={j}
                          className="text-xs bg-white border border-orange-200 text-orange-700 px-3 py-1 rounded-full"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meals */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Utensils className="w-3.5 h-3.5 text-orange-400" />
                    <span>
                      <strong className="text-gray-700">Meals included:</strong>{" "}
                      {day.meals}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
