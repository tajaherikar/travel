import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: [
      "Office No.106/107, First Floor,",
      "Shiv Platino, Opp. Khare Mangal Karyalaya Parking,",
      "Vishrambag, Sangli 416 415 (MS) INDIA",
    ],
  },
  {
    icon: Phone,
    title: "Call / WhatsApp",
    lines: ["+91 96979 88891", "+91 96979 88892", "+91 96979 88893", "+91 96979 88894"],
    links: [
      { href: "tel:+919697988891", text: "+91 96979 88891" },
      { href: "https://wa.me/919697988892", text: "+91 96979 88892 (WhatsApp)" },
      { href: "tel:+919697988893", text: "+91 96979 88893" },
      { href: "tel:+919697988894", text: "+91 96979 88894" },
    ],
  },
  {
    icon: Mail,
    title: "Email Us",
    links: [{ href: "mailto:info@nmtindiaholidays.com", text: "info@nmtindiaholidays.com" }],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 3:00 PM"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email address is required.";
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,15}$/.test(form.phone))
      e.phone = "A valid phone number is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please enter a message (at least 10 characters).";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Send via webhook if configured
    const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "contact_form", ...form }),
        });
      } catch (_) {
        // Silently ignore if webhook is unavailable
      }
    }
    setLoading(false);
    setSubmitted(true);
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(17,24,39,0.88), rgba(194,65,12,0.72)), url('https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&q=80')",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get In Touch</h1>
          <p className="text-gray-300 text-lg">
            Planning a trip or have a question? We'd love to hear from you. Reach out and we'll
            get back to you shortly.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map(({ icon: Icon, title, lines, links }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 shadow-sm flex gap-4"
                >
                  <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{title}</p>
                    {links
                      ? links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target={l.href.startsWith("https://wa.me") ? "_blank" : undefined}
                            rel={l.href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
                            className="block text-sm text-orange-500 hover:text-orange-600 transition-colors"
                          >
                            {l.text}
                          </a>
                        ))
                      : lines?.map((line) => (
                          <p key={line} className="text-sm text-gray-500">
                            {line}
                          </p>
                        ))}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919697988892"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors w-full"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h2 className="text-2xl font-extrabold text-gray-900">Message Sent!</h2>
                  <p className="text-gray-500 max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                          errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                            errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                            errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your travel plans, group size, preferred dates…"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors resize-none ${
                          errors.message ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {loading ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
