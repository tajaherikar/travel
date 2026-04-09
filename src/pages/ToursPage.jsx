import ToursList from "../components/tours/ToursList";

export default function ToursPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-14 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Explore All Tours
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Discover handcrafted travel experiences across India and Asia.
          Filter by destination, duration, or budget.
        </p>
      </div>

      <ToursList />
    </div>
  );
}
