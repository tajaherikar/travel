import { MapPin, ChevronRight } from "lucide-react";

export default function TourMap({ stops }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-orange-500" />
        Tour Route
      </h3>

      {/* Visual route */}
      <div className="flex flex-wrap items-center gap-2">
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                  i === 0
                    ? "bg-orange-500 text-white"
                    : i === stops.length - 1
                    ? "bg-gray-800 text-white"
                    : "bg-orange-100 text-orange-700 border-2 border-orange-300"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs mt-1 font-medium text-center max-w-[64px] leading-tight ${
                  i === 0 ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {stop}
              </span>
            </div>
            {i < stops.length - 1 && (
              <div className="flex items-center mb-4">
                <div className="w-6 h-0.5 bg-orange-200" />
                <ChevronRight className="w-4 h-4 text-orange-300 -ml-1" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Embedded map placeholder */}
      <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 h-48 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-300" />
          <p className="text-sm font-medium">Interactive map coming soon</p>
          <p className="text-xs mt-1">
            Route: {stops.join(" → ")}
          </p>
        </div>
      </div>
    </div>
  );
}
