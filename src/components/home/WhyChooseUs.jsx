import { Shield, Headset, CreditCard, Users, Star, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Travellers" },
  { icon: Star, value: "4.8/5", label: "Average Rating" },
  { icon: Award, value: "50+", label: "Tours Offered" },
  { icon: Shield, value: "100%", label: "Safe & Insured" },
];

const whyUs = [
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "All tours include comprehensive travel insurance and 24/7 emergency support.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "Our travel experts are always available via phone, email or WhatsApp.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    desc: "Pay in installments with no hidden charges. EMI options available.",
  },
  {
    icon: Users,
    title: "Group Discounts",
    desc: "Travel with friends and family — the bigger the group, the bigger the savings.",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      {/* Stats band */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-7 h-7 text-orange-400" />
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Why Choose NMT India Holidays?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors text-center group"
              >
                <div className="w-14 h-14 bg-orange-500 group-hover:bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
