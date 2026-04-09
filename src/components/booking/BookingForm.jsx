import { useState } from "react";
import { sendBookingNotifications } from "../../utils/notifications";
import { User, Phone, Mail, Users, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  adults: 1,
  children: 0,
  message: "",
};

export default function BookingForm({ tour }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const adultPrice = tour?.pricing?.adult ?? 0;
  const childPrice = tour?.pricing?.child ?? 0;
  const total = form.adults * adultPrice + form.children * childPrice;

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^\+?[\d\s-]{7,15}$/.test(form.phone))
      errs.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    if (form.adults < 1) errs.adults = "At least 1 adult required";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "adults" || name === "children" ? Number(value) : value,
    }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");

    const booking = {
      tourId: tour?.id,
      tourTitle: tour?.title,
      ...form,
      totalPrice: total,
      submittedAt: new Date().toISOString(),
    };

    try {
      await sendBookingNotifications(booking);
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Thank you! Our team will contact you within 2 hours to confirm your
          tour booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Hi! I just booked ${tour?.title}. Please confirm my booking.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Chat on WhatsApp
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="text-orange-500 hover:text-orange-700 text-sm font-semibold px-5 py-2.5 border border-orange-200 rounded-xl transition-colors"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <h3 className="font-bold text-lg">Book This Tour</h3>
        {tour && (
          <p className="text-orange-100 text-sm mt-1">{tour.title}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Adults *
              </span>
            </label>
            <input
              type="number"
              name="adults"
              min="1"
              max="20"
              value={form.adults}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.adults ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.adults && (
              <p className="text-red-500 text-xs mt-1">{errors.adults}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Children (5–12)
            </label>
            <input
              type="number"
              name="children"
              min="0"
              max="10"
              value={form.children}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Special Requests (Optional)
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any dietary needs, accessibility requirements..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        {/* Price summary */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-sm font-semibold text-gray-800 mb-2">Price Summary</p>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{form.adults} Adult(s) × {formatCurrency(adultPrice)}</span>
              <span>{formatCurrency(form.adults * adultPrice)}</span>
            </div>
            {form.children > 0 && (
              <div className="flex justify-between">
                <span>{form.children} Child(ren) × {formatCurrency(childPrice)}</span>
                <span>{formatCurrency(form.children * childPrice)}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between font-bold text-orange-600 text-base mt-2 pt-2 border-t border-orange-200">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm text-center">
            Something went wrong. Please try again or contact us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            <>
              Book Now <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          By booking you agree to our terms. No payment required at this step.
        </p>
      </form>
    </div>
  );
}
