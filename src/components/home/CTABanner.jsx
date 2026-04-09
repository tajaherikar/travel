import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-gray-200 text-lg mb-8">
          Start planning your dream trip today. Our travel experts are just a
          call away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tours"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-base transition-colors shadow-xl"
          >
            Explore Tours
          </Link>
          <a
            href="tel:+919876543210"
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-4 rounded-full text-base transition-colors shadow-xl"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20enquire%20about%20a%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full text-base transition-colors shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
