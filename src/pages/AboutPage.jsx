import { Shield, Users, Globe2, Award, Headset, MapPin, Phone, Mail } from "lucide-react";

const stats = [
  { icon: Award, value: "13+", label: "Years of Experience" },
  { icon: Users, value: "300+", label: "Groups Organised" },
  { icon: Globe2, value: "50+", label: "Destinations" },
  { icon: Shield, value: "25,000+", label: "Happy Travellers" },
];

const tabs = [
  {
    id: "mission",
    label: "Our Mission",
    content:
      "At NMT India Holidays, our mission is to craft unforgettable travel experiences that go beyond sightseeing. We aim to connect travelers with the heart and soul of India — its people, culture, landscapes, and heritage. Whether it's a serene escape, a cultural discovery, or an adventurous journey, we strive to turn every trip into a memory that lasts a lifetime.",
  },
  {
    id: "approach",
    label: "Our Approach",
    content:
      "We believe every journey should be thoughtfully planned and seamlessly executed. Our expert team handles every detail — from comfortable accommodations and reliable transport to curated sightseeing and authentic local experiences. We accommodate groups of all sizes and tailor each tour to ensure maximum comfort, safety, and satisfaction.",
  },
  {
    id: "team",
    label: "Our Team",
    content:
      "Our passionate team of travel experts, guides, and coordinators brings decades of combined experience in organising group and individual tours across India and international destinations. Led by our founder, we operate with a commitment to personalised service, attention to detail, and genuine care for every traveller's experience.",
  },
  {
    id: "impact",
    label: "Our Impact",
    content:
      "Since 2013, NMT India Holidays has successfully organised over 300 group tours, taking 25,000+ travellers to 50+ destinations across India and internationally. From the majestic Himalayas to backwaters of Kerala, from the deserts of Rajasthan to the beaches of Southeast Asia — we have built a reputation for reliable, enriching, and value-packed travel.",
  },
];

import { useState } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-28"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(17,24,39,0.85), rgba(194,65,12,0.75)), url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80')",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Northern Mediterranean Tourism India
          </h1>
          <p className="text-xl text-orange-200 font-semibold mb-4">NMT India Holidays</p>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Crafting unforgettable travel experiences since 2013 — your perfect travelling partner.
          </p>
        </div>
      </section>

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

      {/* About tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              About NMT India Holidays
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === t.id
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 text-gray-700 hover:bg-orange-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tabs.map(
            (t) =>
              activeTab === t.id && (
                <div
                  key={t.id}
                  className="bg-orange-50 rounded-2xl p-8 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto"
                >
                  {t.content}
                </div>
              )
          )}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              What Drives Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Safe & Secure", desc: "All tours include comprehensive travel insurance and 24/7 emergency support for complete peace of mind." },
              { icon: Headset, title: "24/7 Support", desc: "Our travel experts are always available via phone, email or WhatsApp whenever you need us." },
              { icon: Users, title: "Group Specialists", desc: "With 300+ groups organised, we have mastered the art of seamless, enjoyable group travel." },
              { icon: Globe2, title: "50+ Destinations", desc: "From the Himalayas to Southeast Asia — we cover India inside-out and beyond its borders." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-white rounded-2xl hover:shadow-md transition-shadow text-center group"
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

      {/* Contact CTA */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Get In Touch With Us</h2>
          <p className="text-orange-100 mb-8 text-lg">
            Ready to plan your next journey? Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <a
              href="tel:+919697988891"
              className="flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-orange-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +91 96979 88891
            </a>
            <a
              href="mailto:info@nmtindiaholidays.com"
              className="flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-orange-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              info@nmtindiaholidays.com
            </a>
            <a
              href="https://wa.me/919697988892"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-orange-100 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Office No.106/107, First Floor, Shiv Platino, Vishrambag, Sangli 416 415 (MS) INDIA</span>
          </div>
        </div>
      </section>
    </div>
  );
}
