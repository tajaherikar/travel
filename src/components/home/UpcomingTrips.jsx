import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tours } from "../../data/tours";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function Countdown({ targetDate }) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
    };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 60000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {[
        { val: time.days, label: "Days" },
        { val: time.hours, label: "Hrs" },
        { val: time.mins, label: "Mins" },
      ].map(({ val, label }) => (
        <div
          key={label}
          className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-center min-w-[52px]"
        >
          <div className="text-orange-600 font-extrabold text-xl leading-none">
            {String(val).padStart(2, "0")}
          </div>
          <div className="text-orange-400 text-xs mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingTrips() {
  const upcoming = tours
    .filter((t) => new Date(t.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Don't Miss Out
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Upcoming Departures
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Secure your spot before seats fill up. Limited slots available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcoming.map((tour) => (
            <div
              key={tour.id}
              className="flex flex-col sm:flex-row gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <img
                src={tour.coverImage}
                alt={tour.title}
                className="w-full sm:w-32 h-32 sm:h-auto rounded-xl object-cover shrink-0"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span
                    className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full mb-2 inline-block ${
                      tour.category === "International"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {tour.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base mb-1">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                      {new Date(tour.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      {tour.duration}
                    </span>
                  </div>
                  <Countdown targetDate={tour.startDate} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-orange-600 font-extrabold text-base">
                    ₹{(tour.pricing.adult / 1000).toFixed(0)}K
                    <span className="text-gray-400 font-normal text-xs"> /person</span>
                  </p>
                  <Link
                    to={`/tours/${tour.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-700 transition-colors"
                  >
                    Book Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
