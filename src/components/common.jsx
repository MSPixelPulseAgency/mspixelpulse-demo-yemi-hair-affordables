import { useEffect, useRef, useState } from "react";
import { ChevronDown, Minus, Plus, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatMoney } from "../config/business";

export function Price({ product, large = false }) {
  const { currency } = useStore();
  const price = currency === "NGN" ? product.priceNGN : product.priceCAD;
  const compare = currency === "NGN" ? product.compareAtPriceNGN : product.compareAtPriceCAD;
  return (
    <div className={`price ${large ? "price--large" : ""}`}>
      <span>{formatMoney(price, currency)}</span>
      {compare ? <del>{formatMoney(compare, currency)}</del> : null}
    </div>
  );
}

export function Rating({ rating = 4.8, count = 0 }) {
  if (!count) return null;
  return (
    <div className="rating" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">{[0, 1, 2, 3, 4].map((item) => <Star key={item} size={15} fill="currentColor" />)}</span>
      <small>{rating.toFixed(1)} ({count})</small>
    </div>
  );
}

export function Quantity({ value, onChange }) {
  return (
    <div className="quantity" aria-label="Quantity">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text, align = "left", action }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Accordion({ items, allowMultiple = false }) {
  const [open, setOpen] = useState([]);
  const toggle = (index) => setOpen((current) => current.includes(index)
    ? current.filter((item) => item !== index)
    : allowMultiple ? [...current, index] : [index]);
  return (
    <div className="accordion">
      {items.map(([question, answer], index) => {
        const active = open.includes(index);
        return (
          <div className="accordion__item" key={question}>
            <button type="button" aria-expanded={active} onClick={() => toggle(index)}>
              <span>{question}</span><ChevronDown className={active ? "rotate" : ""} size={20} />
            </button>
            <div className={`accordion__answer ${active ? "accordion__answer--open" : ""}`}><div><p>{answer}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}

export function Field({ label, name, error, required, help, children }) {
  const helpId = `${name}-help`;
  const errorId = `${name}-error`;
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      {children}
      {help ? <small id={helpId}>{help}</small> : null}
      {error ? <small className="field__error" id={errorId} role="alert">{error}</small> : null}
    </div>
  );
}

export function OrderNotice({ compact = false }) {
  return <p className={`order-notice ${compact ? "order-notice--compact" : ""}`}><strong>Before payment:</strong> availability, customization, delivery timing and the final order total are confirmed with you.</p>;
}
