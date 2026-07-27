import { useEffect } from "react";
import { businessConfig } from "../config/business";

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

export default function Seo({ title, description, path = "", image = "/og-image.svg", schema }) {
  useEffect(() => {
    const fullTitle = title.includes("Yemi Hair") ? title : `${title} | Yemi Hair Affordables`;
    const url = `${businessConfig.siteUrl}${path}`;
    document.title = fullTitle;
    ensureMeta("meta[name='description']", { name: "description", content: description });
    ensureMeta("meta[property='og:title']", { property: "og:title", content: fullTitle });
    ensureMeta("meta[property='og:description']", { property: "og:description", content: description });
    ensureMeta("meta[property='og:image']", { property: "og:image", content: `${businessConfig.siteUrl}${image}` });
    ensureMeta("meta[property='og:url']", { property: "og:url", content: url });
    ensureMeta("meta[name='twitter:card']", { name: "twitter:card", content: "summary_large_image" });
    let canonical = document.head.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    const oldSchema = document.getElementById("page-schema");
    oldSchema?.remove();
    if (schema) {
      const script = document.createElement("script");
      script.id = "page-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, schema]);
  return null;
}
