/**
 * Notification utilities for booking confirmations.
 * Uses fetch to call configurable webhook endpoints.
 * In production, replace VITE_WEBHOOK_URL / VITE_WHATSAPP_URL env vars
 * with real endpoints (e.g. Twilio, WhatsApp Business API, Make/Zapier).
 */

const EMAIL_WEBHOOK = import.meta.env.VITE_EMAIL_WEBHOOK_URL || null;
const WHATSAPP_WEBHOOK = import.meta.env.VITE_WHATSAPP_WEBHOOK_URL || null;

/**
 * Send a booking notification via email webhook (e.g. Zapier / Make).
 */
export async function sendEmailNotification(booking) {
  if (!EMAIL_WEBHOOK) {
    console.info("[Notifications] Email webhook URL not configured — skipping.");
    return { ok: true, skipped: true };
  }

  const payload = {
    subject: `New Booking: ${booking.tourTitle}`,
    body: `
New booking received!

Tour:    ${booking.tourTitle}
Name:    ${booking.name}
Email:   ${booking.email}
Phone:   ${booking.phone}
Adults:  ${booking.adults}
Children: ${booking.children}
Total:   ₹${booking.totalPrice.toLocaleString("en-IN")}
    `.trim(),
    ...booking,
  };

  const res = await fetch(EMAIL_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return { ok: res.ok, status: res.status };
}

/**
 * Trigger a WhatsApp notification via webhook (e.g. Twilio / WA Business API).
 */
export async function sendWhatsAppNotification(booking) {
  if (!WHATSAPP_WEBHOOK) {
    console.info("[Notifications] WhatsApp webhook URL not configured — skipping.");
    return { ok: true, skipped: true };
  }

  const message =
    `🎉 *New Booking Received!*\n\n` +
    `📍 *Tour:* ${booking.tourTitle}\n` +
    `👤 *Name:* ${booking.name}\n` +
    `📱 *Phone:* ${booking.phone}\n` +
    `✉️ *Email:* ${booking.email}\n` +
    `👥 *Adults:* ${booking.adults} | *Children:* ${booking.children}\n` +
    `💰 *Total:* ₹${booking.totalPrice.toLocaleString("en-IN")}`;

  const res = await fetch(WHATSAPP_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, phone: booking.phone, ...booking }),
  });

  return { ok: res.ok, status: res.status };
}

/**
 * Fire both notifications concurrently.
 */
export async function sendBookingNotifications(booking) {
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendEmailNotification(booking),
    sendWhatsAppNotification(booking),
  ]);
  return { emailResult, whatsappResult };
}
