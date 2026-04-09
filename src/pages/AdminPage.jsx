import { useState } from "react";
import { tours as initialTours } from "../data/tours";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  LayoutDashboard,
  Map,
  Users,
  TrendingUp,
  X,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function TourFormModal({ tour, onSave, onClose }) {
  const isNew = !tour;
  const [form, setForm] = useState(
    tour ?? {
      id: "",
      title: "",
      category: "Domestic",
      coverImage: "",
      duration: "",
      startLocation: "",
      endLocation: "",
      startDate: "",
      endDate: "",
      nextDeparture: "",
      pricing: { adult: 0, child: 0, earlyBirdDiscount: 0, groupDiscount: "" },
      stops: [],
      itinerary: [],
      highlights: [],
      inclusions: [],
      exclusions: [],
      trending: false,
      rating: 4.5,
      reviews: 0,
      gallery: [],
    }
  );

  const [newStop, setNewStop] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  function set(path, value) {
    const keys = path.split(".");
    setForm((prev) => {
      const next = { ...prev };
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function addStop() {
    if (newStop.trim()) {
      setForm((p) => ({ ...p, stops: [...p.stops, newStop.trim()] }));
      setNewStop("");
    }
  }

  function removeStop(i) {
    setForm((p) => ({ ...p, stops: p.stops.filter((_, idx) => idx !== i) }));
  }

  function addHighlight() {
    if (newHighlight.trim()) {
      setForm((p) => ({ ...p, highlights: [...p.highlights, newHighlight.trim()] }));
      setNewHighlight("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = form.id || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    onSave({ ...form, id });
  }

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl my-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {isNew ? "Add New Tour" : `Edit: ${form.title}`}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tour Title *</label>
              <input required className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Bali & Singapore Adventure" />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                <option>Domestic</option>
                <option>International</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <input className={inputCls} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="8 Days / 7 Nights" />
            </div>
            <div>
              <label className={labelCls}>Cover Image URL</label>
              <input className={inputCls} value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className={labelCls}>Start Location</label>
              <input className={inputCls} value={form.startLocation} onChange={(e) => set("startLocation", e.target.value)} placeholder="Mumbai" />
            </div>
            <div>
              <label className={labelCls}>End Location</label>
              <input className={inputCls} value={form.endLocation} onChange={(e) => set("endLocation", e.target.value)} placeholder="Singapore" />
            </div>
            <div>
              <label className={labelCls}>Start Date</label>
              <input type="date" className={inputCls} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Next Departure</label>
              <input type="date" className={inputCls} value={form.nextDeparture} onChange={(e) => set("nextDeparture", e.target.value)} />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">Pricing</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className={labelCls}>Adult Price (₹)</label>
                <input type="number" className={inputCls} value={form.pricing.adult} onChange={(e) => set("pricing.adult", Number(e.target.value))} />
              </div>
              <div>
                <label className={labelCls}>Child Price (₹)</label>
                <input type="number" className={inputCls} value={form.pricing.child} onChange={(e) => set("pricing.child", Number(e.target.value))} />
              </div>
              <div>
                <label className={labelCls}>Early Bird Discount (₹)</label>
                <input type="number" className={inputCls} value={form.pricing.earlyBirdDiscount} onChange={(e) => set("pricing.earlyBirdDiscount", Number(e.target.value))} />
              </div>
              <div>
                <label className={labelCls}>Group Discount</label>
                <input className={inputCls} value={form.pricing.groupDiscount} onChange={(e) => set("pricing.groupDiscount", e.target.value)} placeholder="10% off for 10+" />
              </div>
            </div>
          </div>

          {/* Stops */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">Tour Stops / Route</p>
            <div className="flex gap-2 mb-2">
              <input
                className={inputCls}
                value={newStop}
                onChange={(e) => setNewStop(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addStop())}
                placeholder="Add a stop (e.g. Bali)"
              />
              <button type="button" onClick={addStop} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors whitespace-nowrap">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.stops.map((s, i) => (
                <span key={i} className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-3 py-1.5 rounded-full">
                  {s}
                  <button type="button" onClick={() => removeStop(i)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-3">Highlights</p>
            <div className="flex gap-2 mb-2">
              <input
                className={inputCls}
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                placeholder="e.g. Taj Mahal sunrise"
              />
              <button type="button" onClick={addHighlight} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors whitespace-nowrap">
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {form.highlights.map((h, i) => (
                <li key={i} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  {h}
                  <button type="button" onClick={() => setForm((p) => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) }))}>
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trending */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={form.trending}
                onChange={(e) => set("trending", e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
            <span className="text-sm font-medium text-gray-700">Mark as Trending</span>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors">
              <Save className="w-4 h-4" />
              {isNew ? "Create Tour" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [toursData, setToursData] = useState(initialTours);
  const [editingTour, setEditingTour] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  function handleSave(saved) {
    if (editingTour) {
      setToursData((p) => p.map((t) => (t.id === saved.id ? saved : t)));
    } else {
      setToursData((p) => [saved, ...p]);
    }
    setShowForm(false);
    setEditingTour(null);
  }

  function handleDelete(id) {
    setToursData((p) => p.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  }

  const stats = [
    { icon: Map, label: "Total Tours", value: toursData.length, color: "bg-blue-50 text-blue-600" },
    { icon: TrendingUp, label: "Trending", value: toursData.filter((t) => t.trending).length, color: "bg-orange-50 text-orange-600" },
    { icon: LayoutDashboard, label: "Domestic", value: toursData.filter((t) => t.category === "Domestic").length, color: "bg-green-50 text-green-600" },
    { icon: Users, label: "International", value: toursData.filter((t) => t.category === "International").length, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your tours — create, edit, and track tour listings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className={`${color} rounded-2xl p-5 flex items-center gap-4`}>
              <Icon className="w-7 h-7 shrink-0" />
              <div>
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-xs font-medium opacity-70">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Tour Listings</h2>
          <button
            onClick={() => { setEditingTour(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Tour
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Tour</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden sm:table-cell">Category</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Duration</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Price</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden lg:table-cell">Rating</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {toursData.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.coverImage}
                          alt={t.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{t.title}</p>
                          {t.trending && (
                            <span className="text-orange-500 text-xs">🔥 Trending</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${t.category === "International" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                        {t.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{t.duration}</td>
                    <td className="px-5 py-4 font-semibold text-orange-600">
                      ₹{(t.pricing.adult / 1000).toFixed(0)}K
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="flex items-center gap-1 text-gray-600">
                        ⭐ {t.rating}
                        <span className="text-gray-400 text-xs">({t.reviews})</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/tours/${t.id}`}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => { setEditingTour(t); setShowForm(true); }}
                          className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(t.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tour Form Modal */}
      {showForm && (
        <TourFormModal
          tour={editingTour}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingTour(null); }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Tour?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. The tour will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
