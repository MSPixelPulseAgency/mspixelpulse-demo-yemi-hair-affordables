export const businessConfig = {
  name: "Yemi Hair Affordables",
  owner: "Rosaline",
  tagline: "Beautiful hair. Fair prices.",
  email: import.meta.env.VITE_BUSINESS_EMAIL || "",
  phone: import.meta.env.VITE_BUSINESS_PHONE || "",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "",
  tiktok: import.meta.env.VITE_TIKTOK_URL || "",
  facebook: import.meta.env.VITE_FACEBOOK_URL || "",
  locationNote: "Serving customers in Canada, Nigeria and selected international locations.",
  defaultCurrency: "NGN",
  supportedCurrencies: ["NGN", "CAD"],
  orderEmailEnabled: import.meta.env.VITE_ENABLE_EMAIL_ORDERS === "true",
  whatsappOrdersEnabled: import.meta.env.VITE_ENABLE_WHATSAPP_ORDERS !== "false",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://yemi-hair.vercel.app",
  orderEmailEndpoint: import.meta.env.VITE_ORDER_EMAIL_ENDPOINT || ""
};

export const formatMoney = (amount, currency) =>
  new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
