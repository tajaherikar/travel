import { testimonials } from "../../data/tours";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Traveller Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Voices of Experience
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Hear what our travellers say about their unforgettable journeys with NMT India Holidays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-orange-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                {t.text}
              </p>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-100 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">
                    {t.location} · {t.date}
                  </p>
                </div>
              </div>
              <p className="text-xs text-orange-500 font-medium mt-2 truncate">
                {t.tour}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
