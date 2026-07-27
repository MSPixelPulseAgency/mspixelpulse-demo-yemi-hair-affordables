import { useMemo, useRef, useState } from "react";
import { CheckCircle2, LockKeyhole, MessageCircle, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { Field, OrderNotice } from "../components/common";
import { formatMoney } from "../config/business";
import { useStore } from "../context/StoreContext";
import { buildOrderMessage, createOrderReference, saveOrderSummary } from "../services/orderService";

const initial = {
  firstName: "", lastName: "", email: "", phone: "", whatsapp: "", contactMethod: "Email",
  country: "Nigeria", region: "", city: "", address: "", unit: "", postalCode: "", deliveryMethod: "Delivery",
  neededBy: "", notes: "", payment: "Contact me to confirm payment", consent: false, honeypot: ""
};

const validate = (values) => {
  const errors = {};
  ["firstName", "lastName", "phone", "country", "city"].forEach((key) => { if (!values[key].trim()) errors[key] = "This field is required."; });
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
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
  const productOptions = useMemo(() => cart.map((item) => `${item.product.shortName} — ${item.selected.length}, ${item.selected.laceType}`).join("; "), [cart]);

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
      reference, createdAt: new Date().toISOString(), status: "Order summary created",
      currency, total: cartTotal, items: cart,
      customer: { firstName: values.firstName, lastName: values.lastName, email: values.email, phone: values.phone, whatsapp: values.whatsapp, contactMethod: values.contactMethod },
      delivery: { country: values.country, region: values.region, city: values.city, address: values.address, unit: values.unit, postalCode: values.postalCode, method: values.deliveryMethod },
      details: { neededBy: values.neededBy, notes: values.notes, payment: values.payment }
    };
    order.message = buildOrderMessage(order, formatMoney);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    saveOrderSummary(order);
    clearCart();
    navigate("/order-success", { state: { reference } });
  };

  if (!cart.length) return (
    <>
      <Seo title="Checkout" description="Create an order summary for selected Yemi Hair Affordables products." path="/checkout" />
      <div className="container empty-state page-empty"><ShoppingBag size={42} /><h1>Your cart is ready for a look.</h1><p>Add a style before starting checkout.</p><Link className="button button--primary" to="/shop">Shop hair</Link></div>
    </>
  );

  return (
    <>
      <Seo title="Checkout & Order Summary" description="Review your Yemi Hair Affordables selections and create a shareable order summary. No card information is collected." path="/checkout" />
      <header className="page-hero page-hero--compact"><div className="container"><p className="eyebrow">Secure request flow</p><h1>Review your order</h1><p>No card details are collected. Payment and delivery are confirmed separately.</p></div></header>
      <section className="section section--tight">
        <form className="container checkout-layout" onSubmit={submit} noValidate ref={formRef}>
          <div className="checkout-form">
            {Object.values(errors).some(Boolean) ? <div className="error-summary" role="alert"><strong>Please review the highlighted fields.</strong><p>Your information is still saved in the form below.</p></div> : null}
            <fieldset><legend><span>1</span> Customer information</legend><div className="form-grid">
              <Field label="First name" name="firstName" required error={errors.firstName}><input id="firstName" name="firstName" autoComplete="given-name" value={values.firstName} onChange={update} aria-invalid={Boolean(errors.firstName)} /></Field>
              <Field label="Last name" name="lastName" required error={errors.lastName}><input id="lastName" name="lastName" autoComplete="family-name" value={values.lastName} onChange={update} aria-invalid={Boolean(errors.lastName)} /></Field>
              <Field label="Email" name="email" required error={errors.email}><input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} /></Field>
              <Field label="Phone" name="phone" required error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} aria-invalid={Boolean(errors.phone)} /></Field>
              <Field label="WhatsApp number" name="whatsapp" help="Optional if different from phone."><input id="whatsapp" name="whatsapp" type="tel" value={values.whatsapp} onChange={update} /></Field>
              <Field label="Preferred contact" name="contactMethod"><select id="contactMethod" name="contactMethod" value={values.contactMethod} onChange={update}><option>Email</option><option>Phone</option><option>WhatsApp</option></select></Field>
            </div></fieldset>
            <fieldset><legend><span>2</span> Delivery information</legend><div className="form-grid">
              <Field label="Country" name="country" required error={errors.country}><select id="country" name="country" value={values.country} onChange={update} aria-invalid={Boolean(errors.country)}><option>Canada</option><option>Nigeria</option><option>Other international location</option></select></Field>
              <Field label="Province / state" name="region"><input id="region" name="region" autoComplete="address-level1" value={values.region} onChange={update} /></Field>
              <Field label="City" name="city" required error={errors.city}><input id="city" name="city" autoComplete="address-level2" value={values.city} onChange={update} aria-invalid={Boolean(errors.city)} /></Field>
              <Field label="Postal code" name="postalCode"><input id="postalCode" name="postalCode" autoComplete="postal-code" value={values.postalCode} onChange={update} /></Field>
              <Field label="Address" name="address"><input id="address" name="address" autoComplete="street-address" value={values.address} onChange={update} /></Field>
              <Field label="Apartment / unit" name="unit"><input id="unit" name="unit" value={values.unit} onChange={update} /></Field>
              <Field label="Delivery or pickup" name="deliveryMethod"><select id="deliveryMethod" name="deliveryMethod" value={values.deliveryMethod} onChange={update}><option>Delivery</option><option>Pickup — if confirmed</option></select></Field>
            </div></fieldset>
            <fieldset><legend><span>3</span> Order details</legend><div className="form-grid">
              <Field label="Selected products" name="products" help="Edit options from your cart if needed."><textarea id="products" rows="3" readOnly value={productOptions} /></Field>
              <Field label="Needed-by date" name="neededBy" help="A requested date is not a guaranteed delivery date."><input id="neededBy" name="neededBy" type="date" value={values.neededBy} onChange={update} /></Field>
              <Field label="Additional customization or notes" name="notes"><textarea id="notes" name="notes" rows="4" value={values.notes} onChange={update} placeholder="Colour, styling, delivery or product questions" /></Field>
            </div></fieldset>
            <fieldset><legend><span>4</span> Payment preference</legend><p className="fieldset-help">These options are request preferences only. This site does not collect payment information.</p><div className="radio-list">{["Pay online — when enabled", "Bank transfer", "E-transfer", "Cash or pickup — if enabled", "Contact me to confirm payment"].map((option) => <label key={option}><input type="radio" name="payment" value={option} checked={values.payment === option} onChange={update} /><span>{option}</span></label>)}</div></fieldset>
            <div className="honeypot" aria-hidden="true"><label>Company website<input name="honeypot" tabIndex="-1" autoComplete="off" value={values.honeypot} onChange={update} /></label></div>
            <label className="consent-check"><input type="checkbox" name="consent" checked={values.consent} onChange={update} aria-invalid={Boolean(errors.consent)} /><span>I understand this creates an order summary and does not complete payment. <strong>Required.</strong></span></label>
            {errors.consent ? <p className="field__error" role="alert">{errors.consent}</p> : null}
            <button className="button button--primary button--large button--full" type="submit" disabled={submitting}>{submitting ? "Creating summary…" : "Create order summary"}</button>
            <p className="secure-note"><LockKeyhole size={17} /> No card or banking details are collected or stored.</p>
          </div>
          <aside className="checkout-summary">
            <h2>Order summary</h2>
            {cart.map((item) => <div className="checkout-summary__item" key={item.key}><img src={item.product.images[0]} alt="" width="72" height="90" /><span><strong>{item.product.shortName}</strong><small>{item.selected.length} · {item.selected.laceType} · Qty {item.quantity}</small></span><b>{formatMoney((currency === "NGN" ? item.product.priceNGN : item.product.priceCAD) * item.quantity, currency)}</b></div>)}
            <div className="checkout-summary__row"><span>{itemCount} items</span><strong>{formatMoney(cartTotal, currency)}</strong></div>
            <div className="checkout-summary__row"><span>Delivery</span><strong>Confirmed with order</strong></div>
            <div className="checkout-summary__total"><span>Items subtotal</span><strong>{formatMoney(cartTotal, currency)}</strong></div>
            <p><CheckCircle2 size={17} /> Currency: {currency}. NGN and CAD prices are listed separately.</p>
            <p><MessageCircle size={17} /> A copyable order summary is prepared on the next page.</p>
            <OrderNotice compact />
          </aside>
        </form>
      </section>
    </>
  );
}
