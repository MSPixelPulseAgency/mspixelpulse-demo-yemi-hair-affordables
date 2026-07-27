import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock3, ImagePlus, Sparkles, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoopingVideo from "../components/LoopingVideo";
import Seo from "../components/Seo";
import { Field, OrderNotice } from "../components/common";
import { useStore } from "../context/StoreContext";
import { createOrderReference, saveOrderSummary } from "../services/orderService";

const initial = {
  name: "",
  phone: "",
  style: "",
  location: "",
  budget: "",
  notes: "",
  consent: false,
  website: ""
};

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.phone.trim()) errors.phone = "Enter a phone or WhatsApp number.";
  if (!values.style.trim()) errors.style = "Choose the closest style.";
  if (!values.location.trim()) errors.location = "Enter your city and country.";
  if (!values.consent) errors.consent = "Confirm that this is a request, not a completed payment.";
  return errors;
};

export default function CustomOrderPage() {
  const navigate = useNavigate();
  const { currency, setToast } = useStore();
  const formRef = useRef(null);
  const previewUrl = useRef("");
  const [values, setValues] = useState(initial);
  const [referenceFile, setReferenceFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
  }, []);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = URL.createObjectURL(file);
    setReferenceFile({ name: file.name, preview: previewUrl.current });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (values.website) return;
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      requestAnimationFrame(() => formRef.current?.querySelector("[aria-invalid='true']")?.focus());
      return;
    }

    setSubmitting(true);
    const reference = createOrderReference().replace("YHA", "YHA-CUSTOM");
    const message = [
      "Hello Yemi Hair Affordables,",
      "",
      "I would like help with a custom hair order.",
      `Reference: ${reference}`,
      `Name: ${values.name}`,
      `Phone / WhatsApp: ${values.phone}`,
      `Style: ${values.style}`,
      `Location: ${values.location}`,
      `Budget: ${values.budget || "Not specified"} ${values.budget ? currency : ""}`,
      `Reference image: ${referenceFile ? `${referenceFile.name} (I will attach it separately)` : "None"}`,
      `Notes: ${values.notes || "None"}`,
      "",
      "Please confirm availability, the final specifications, price, payment and delivery."
    ].join("\n");
    const order = {
      kind: "custom",
      reference,
      createdAt: new Date().toISOString(),
      status: "Custom request ready to share",
      currency,
      total: null,
      items: [],
      customer: { firstName: values.name, lastName: "", phone: values.phone, email: "" },
      delivery: { city: values.location, country: "" },
      details: { style: values.style, budget: values.budget, notes: values.notes, referenceFile: referenceFile?.name || "" },
      message
    };
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    saveOrderSummary(order);
    setToast(`Quick request ${reference} is ready.`);
    navigate("/order-success");
  };

  return (
    <>
      <Seo title="Quick Custom Hair Order" description="Prepare a custom Yemi Hair Affordables request in one short form with your style, location and contact details." path="/custom-order" />
      <header className="custom-hero">
        <div className="container">
          <p className="eyebrow">Quick custom request</p>
          <h1>Tell us the look. We’ll confirm the details.</h1>
          <p>One short form—no six-step process. Most requests take about two minutes to prepare.</p>
        </div>
      </header>
      <section className="section section--tight custom-order">
        <div className="container quick-order-layout">
          <form className="quick-order-form" onSubmit={submit} noValidate ref={formRef}>
            <div className="quick-order-form__heading">
              <p className="eyebrow">Only the essentials</p>
              <h2>Start your request</h2>
              <p>We will confirm length, lace, density, cap size, exact price and delivery with you after you share the summary.</p>
            </div>
            {Object.values(errors).some(Boolean) ? <div className="error-summary" role="alert"><strong>Please complete the highlighted fields.</strong></div> : null}
            <div className="form-grid quick-order-fields">
              <Field label="Your name" name="name" required error={errors.name}>
                <input id="name" name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} />
              </Field>
              <Field label="Phone or WhatsApp" name="phone" required error={errors.phone}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} aria-invalid={Boolean(errors.phone)} />
              </Field>
              <Field label="Closest style" name="style" required error={errors.style}>
                <select id="style" name="style" value={values.style} onChange={update} aria-invalid={Boolean(errors.style)}>
                  <option value="">Choose one</option>
                  <option>Bob wig</option>
                  <option>Straight wig</option>
                  <option>Body wave</option>
                  <option>Curly or kinky texture</option>
                  <option>Bundles or closure</option>
                  <option>Not sure — help me choose</option>
                </select>
              </Field>
              <Field label="City and country" name="location" required error={errors.location}>
                <input id="location" name="location" autoComplete="address-level2" value={values.location} onChange={update} placeholder="e.g. Lagos, Nigeria" aria-invalid={Boolean(errors.location)} />
              </Field>
              <Field label={`Budget in ${currency} (optional)`} name="budget" help="A range is enough.">
                <input id="budget" name="budget" inputMode="numeric" value={values.budget} onChange={update} placeholder={currency === "NGN" ? "e.g. 100,000–180,000" : "e.g. 150–300"} />
              </Field>
              <Field label="Anything important? (optional)" name="notes">
                <textarea id="notes" name="notes" rows="3" value={values.notes} onChange={update} placeholder="Preferred length, colour or when you need it" />
              </Field>
            </div>
            <label className="quick-upload">
              <span><ImagePlus size={22} /><strong>Reference image</strong><small>Optional · stays on this device</small></span>
              <input type="file" accept="image/*" onChange={chooseImage} />
              <em><Upload size={16} /> {referenceFile ? "Change image" : "Choose image"}</em>
            </label>
            {referenceFile ? <div className="quick-upload__preview"><img src={referenceFile.preview} alt="Selected hairstyle reference preview" /><span>{referenceFile.name}</span></div> : null}
            <div className="honeypot" aria-hidden="true"><label>Website<input name="website" value={values.website} onChange={update} tabIndex="-1" autoComplete="off" /></label></div>
            <label className="consent-check">
              <input type="checkbox" name="consent" checked={values.consent} onChange={update} aria-invalid={Boolean(errors.consent)} />
              <span>I understand this prepares a request summary and does not complete payment. <strong>Required.</strong></span>
            </label>
            {errors.consent ? <p className="field__error" role="alert">{errors.consent}</p> : null}
            <button className="button button--primary button--large button--full" type="submit" disabled={submitting}>
              <Sparkles size={18} /> {submitting ? "Preparing request…" : "Prepare quick request"}
            </button>
            <p className="secure-note"><CheckCircle2 size={17} /> No card or banking details are requested.</p>
          </form>

          <aside className="quick-order-media">
            <LoopingVideo src="/videos/wig-styling.mp4" poster="/images/video-posters/wig-styling.webp" label="Black woman fitting and styling a smooth wig" />
            <div>
              <p className="eyebrow">Simple by design</p>
              <h2>Send the idea first.</h2>
              <p>The finer choices can be confirmed in conversation, without slowing down your first request.</p>
              <span><Clock3 size={17} /> About two minutes</span>
              <OrderNotice compact />
              <small>Inspiration footage from Pexels; not a customer order or a specific product.</small>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
