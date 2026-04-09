import { CheckCircle2, XCircle, Tag, Users } from "lucide-react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PricingSection({ pricing }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500">
        <h3 className="text-white font-bold text-lg mb-1">Pricing</h3>
        <p className="text-orange-100 text-sm">Inclusive of taxes</p>
      </div>

      <div className="p-6">
        {/* Prices */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Adult
            </p>
            <p className="text-2xl font-extrabold text-orange-600">
              {formatCurrency(pricing.adult)}
            </p>
            <p className="text-xs text-gray-400 mt-1">per person</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Child (5–12 yrs)
            </p>
            <p className="text-2xl font-extrabold text-green-600">
              {formatCurrency(pricing.child)}
            </p>
            <p className="text-xs text-gray-400 mt-1">per child</p>
          </div>
        </div>

        {/* Discounts */}
        <div className="space-y-3 mb-6">
          {pricing.earlyBirdDiscount > 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <Tag className="w-4 h-4 text-yellow-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">
                  Early Bird Discount
                </p>
                <p className="text-xs text-yellow-600">
                  Save {formatCurrency(pricing.earlyBirdDiscount)} — Book early!
                </p>
              </div>
            </div>
          )}
          {pricing.groupDiscount && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <Users className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Group Discount
                </p>
                <p className="text-xs text-blue-600">{pricing.groupDiscount}</p>
              </div>
            </div>
          )}
        </div>

        {/* Inclusions/Exclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Included
            </p>
            <ul className="space-y-1.5">
              {(pricing.inclusions || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-red-400" /> Excluded
            </p>
            <ul className="space-y-1.5">
              {(pricing.exclusions || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
