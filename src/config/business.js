export const businessConfig = {
  name: "Yemi Hair Affordables",
  owner: "Rosaline",
  tagline: "Beautiful hair. Fair prices.",
  email: "hello@mspixelpulse.com",
  phone: "+1 (000) 000-0000",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  instagram: "#",
  tiktok: "#",
  facebook: "#",
  locationNote: "Serving customers in Canada, Nigeria and selected international locations.",
  defaultCurrency: "CAD",
  supportedCurrencies: ["CAD", "NGN"],
  orderEmailEnabled: import.meta.env.VITE_ENABLE_EMAIL_ORDERS === "true",
  whatsappOrdersEnabled: import.meta.env.VITE_ENABLE_WHATSAPP_ORDERS !== "false",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://mspixelpulse-demo-yemi-hair-afforda.vercel.app",
  orderEmailEndpoint: import.meta.env.VITE_ORDER_EMAIL_ENDPOINT || "",
  notice: "All product names, prices, availability, reviews and shipping estimates are demo content and must be confirmed by Rosaline before launch."
};

export const formatMoney = (amount, currency) =>
  new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
