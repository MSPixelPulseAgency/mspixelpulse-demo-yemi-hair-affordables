import { useRef, useState } from "react";
import { CheckCircle2, LockKeyhole, MessageCircle, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { Field, OrderNotice } from "../components/common";
import { formatMoney } from "../config/business";
import { useStore } from "../context/StoreContext";
import { buildOrderMessage, createOrderReference, saveOrderSummary } from "../services/orderService";

const initial = {
  name: "",
  phone: "",
  email: "",
  country: "Nigeria",
  city: "",
  notes: "",
  consent: false,
  honeypot: ""
};

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.phone.trim()) errors.phone = "Enter a phone or WhatsApp number.";
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email or leave it blank.";
  if (!values.city.trim()) errors.city = "Enter your city.";
  if (!values.consent) errors.consent = "Confirm that you understand this is an order request.";
  return errors;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, currency, cartTotal, clearCart } = useStore();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (values.honeypot) return;
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      requestAnimationFrame(() => formRef.current?.querySelector("[aria-invalid='true']")?.focus());
      return;
    }
    setSubmitting(true);
    const reference = createOrderReference();
    const order = {
      kind: "catalogue",
      reference,
      createdAt: new Date().toISOString(),
      status: "Order summary created",
      currency,
      total: cartTotal,
      items: cart,
      customer: { firstName: values.name, lastName: "", email: values.email, phone: values.phone, whatsapp: values.phone, contactMethod: "Phone or WhatsApp" },
      delivery: { country: values.country, city: values.city, region: "", address: "", unit: "", postalCode: "", method: "To be confirmed" },
      details: { neededBy: "", notes: values.notes, payment: "To be confirmed" }
    };
    order.message = buildOrderMessage(order, formatMoney);
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    saveOrderSummary(order);
    clearCart();
    navigate("/order-success");
  };

  if (!cart.length) return (
    <>
      <Seo title="Checkout" description="Create an order summary for selected Yemi Hair Affordables products." path="/checkout" />
      <div className="container empty-state page-empty"><ShoppingBag size={42} /><h1>Your cart is ready for a look.</h1><p>Add a style before starting checkout.</p><Link className="button button--primary" to="/shop">Shop hair</Link></div>
    </>
  );

  return (
    <>
      <Seo title="Quick Checkout & Order Summary" description="Prepare a Yemi Hair Affordables order request with essential contact and location details. No card information is collected." path="/checkout" />
      <header className="page-hero page-hero--compact"><div className="container"><p className="eyebrow">Quick order request</p><h1>Review, add your contact, done.</h1><p>Delivery, payment and final availability are confirmed after you share the summary.</p></div></header>
      <section className="section section--tight">
        <form className="container checkout-layout checkout-layout--quick" onSubmit={submit} noValidate ref={formRef}>
          <div className="checkout-form checkout-form--quick">
            <div className="quick-order-form__heading">
              <p className="eyebrow">Essential details only</p>
              <h2>Where should we follow up?</h2>
              <p>Exact address and payment details are confirmed later. They are not needed to prepare this request.</p>
            </div>
            {Object.values(errors).some(Boolean) ? <div className="error-summary" role="alert"><strong>Please complete the highlighted fields.</strong></div> : null}
            <div className="form-grid quick-checkout-fields">
              <Field label="Your name" name="name" required error={errors.name}><input id="name" name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} /></Field>
              <Field label="Phone or WhatsApp" name="phone" required error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} aria-invalid={Boolean(errors.phone)} /></Field>
              <Field label="Email (optional)" name="email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} /></Field>
              <Field label="Country" name="country" required><select id="country" name="country" value={values.country} onChange={update}><option>Nigeria</option><option>Canada</option><option>Other international location</option></select></Field>
              <Field label="City" name="city" required error={errors.city}><input id="city" name="city" autoComplete="address-level2" value={values.city} onChange={update} aria-invalid={Boolean(errors.city)} /></Field>
              <Field label="Order note (optional)" name="notes"><textarea id="notes" name="notes" rows="3" value={values.notes} onChange={update} placeholder="Colour, timing or product question" /></Field>
            </div>
            <div className="honeypot" aria-hidden="true"><label>Company website<input name="honeypot" tabIndex="-1" autoComplete="off" value={values.honeypot} onChange={update} /></label></div>
            <label className="consent-check"><input type="checkbox" name="consent" checked={values.consent} onChange={update} aria-invalid={Boolean(errors.consent)} /><span>I understand this prepares an order summary and does not complete payment. <strong>Required.</strong></span></label>
            {errors.consent ? <p className="field__error" role="alert">{errors.consent}</p> : null}
            <button className="button button--primary button--large button--full" type="submit" disabled={submitting}>{submitting ? "Preparing summary…" : "Prepare order request"}</button>
            <p className="secure-note"><LockKeyhole size={17} /> No card, banking or full address details are collected.</p>
          </div>
          <aside className="checkout-summary">
            <h2>Order summary</h2>
            {cart.map((item) => <div className="checkout-summary__item" key={item.key}><img src={item.product.images[0]} alt="" width="72" height="90" /><span><strong>{item.product.shortName}</strong><small>{item.selected.length} · {item.selected.laceType} · Qty {item.quantity}</small></span><b>{formatMoney((currency === "NGN" ? item.product.priceNGN : item.product.priceCAD) * item.quantity, currency)}</b></div>)}
            <div className="checkout-summary__row"><span>{itemCount} items</span><strong>{formatMoney(cartTotal, currency)}</strong></div>
            <div className="checkout-summary__row"><span>Delivery</span><strong>Confirmed later</strong></div>
            <div className="checkout-summary__total"><span>Items subtotal</span><strong>{formatMoney(cartTotal, currency)}</strong></div>
            <p><CheckCircle2 size={17} /> Currency: {currency}. NGN and CAD prices are listed separately.</p>
            <p><MessageCircle size={17} /> A copyable summary is prepared on the next page.</p>
            <OrderNotice compact />
          </aside>
        </form>
      </section>
    </>
  );
}
