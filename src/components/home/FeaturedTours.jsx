import { Link } from "react-router-dom";
import { tours } from "../../data/tours";
import TourCard from "../tours/TourCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedTours() {
  const featured = tours.filter((t) => t.trending).slice(0, 3);

  return (
    <section id="featured" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Popular Picks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Featured Tours
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Hand-picked travel experiences loved by thousands of happy travellers
            across India and Asia.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors"
          >
            View All Tours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
