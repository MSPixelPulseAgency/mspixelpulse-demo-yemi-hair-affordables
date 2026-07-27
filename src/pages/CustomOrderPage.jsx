import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ImagePlus, Sparkles, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { Field, OrderNotice } from "../components/common";
import { createOrderReference } from "../services/orderService";
import { useStore } from "../context/StoreContext";

const steps = ["Hair type", "Style", "Specifications", "Inspiration", "Delivery", "Review"];
const initial = {
  hairType: "", style: "", length: "16 inches", colour: "Natural black", lace: "Not sure", density: "180%",
  capSize: "Medium", glueless: "Yes", budgetCurrency: "NGN", budget: "", country: "Nigeria", city: "",
  neededBy: "", delivery: "Delivery", firstName: "", lastName: "", email: "", phone: "", notes: ""
};

const choices = {
  hairType: ["Wig", "Bundles", "Closure wig", "Frontal wig", "Headband wig", "Bob wig", "Not sure — help me choose"],
  style: ["Straight", "Body wave", "Deep wave", "Water wave", "Kinky curly", "Loose curl", "Custom reference"]
};

export default function CustomOrderPage() {
  const navigate = useNavigate();
  const { setToast } = useStore();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(() => {
    try { return JSON.parse(localStorage.getItem("yha-custom-draft")) || initial; } catch { return initial; }
  });
  const [files, setFiles] = useState([]);
  const fileUrls = useRef([]);
  const [errors, setErrors] = useState({});
  useEffect(() => localStorage.setItem("yha-custom-draft", JSON.stringify(values)), [values]);
  useEffect(() => () => fileUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };
  const select = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const addFiles = (event) => {
    const selected = [...event.target.files].slice(0, 3 - files.length).map((file) => ({ file, name: file.name, preview: URL.createObjectURL(file) }));
    fileUrls.current.push(...selected.map((file) => file.preview));
    setFiles((current) => [...current, ...selected].slice(0, 3));
  };
  const removeFile = (index) => setFiles((current) => {
    URL.revokeObjectURL(current[index].preview);
    fileUrls.current = fileUrls.current.filter((url) => url !== current[index].preview);
    return current.filter((_, itemIndex) => itemIndex !== index);
  });
  const canAdvance = useMemo(() => {
    if (step === 0) return Boolean(values.hairType);
    if (step === 1) return Boolean(values.style);
    if (step === 4) return Boolean(values.country && values.city);
    if (step === 5) return Boolean(values.firstName && values.email && values.phone);
    return true;
  }, [step, values]);
  const next = () => {
    if (!canAdvance) {
      setErrors({ step: "Complete the required choices before continuing." });
      return;
    }
    setErrors({});
    setStep((current) => Math.min(5, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const submit = () => {
    if (!canAdvance) return next();
    const reference = createOrderReference().replace("YHA", "YHA-CUSTOM");
    const customOrder = { reference, createdAt: new Date().toISOString(), values, files: files.map((file) => file.name), status: "Custom order summary created" };
    localStorage.setItem("yha-latest-custom-order", JSON.stringify(customOrder));
    localStorage.removeItem("yha-custom-draft");
    setToast(`Custom request ${reference} saved.`);
    navigate("/contact", { state: { customReference: reference } });
  };

  return (
    <>
      <Seo title="Custom Hair Order" description="Build a custom Yemi Hair Affordables request by choosing hair type, style, length, lace, density, cap size, budget and delivery details." path="/custom-order" />
      <header className="custom-hero"><div className="container"><p className="eyebrow">Guided by Rosaline</p><h1>Your idea, shaped into the right hair.</h1><p>Tell us what you love. This six-step request keeps every important detail together.</p></div></header>
      <section className="section section--tight custom-order">
        <div className="container">
          <div className="progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
            <div className="progress__bar"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }}></span></div>
            <ol>{steps.map((label, index) => <li className={index <= step ? "is-active" : ""} key={label}><span>{index < step ? <Check size={15} /> : index + 1}</span><small>{label}</small></li>)}</ol>
          </div>
          <div className="wizard">
            <div className="wizard__heading"><p className="eyebrow">Step {step + 1} of 6</p><h2>{stepTitles[step]}</h2><p>{stepDescriptions[step]}</p></div>
            {errors.step ? <p className="error-summary" role="alert">{errors.step}</p> : null}
            {step === 0 ? <ChoiceGrid options={choices.hairType} value={values.hairType} onSelect={(value) => select("hairType", value)} /> : null}
            {step === 1 ? <ChoiceGrid options={choices.style} value={values.style} onSelect={(value) => select("style", value)} visual /> : null}
            {step === 2 ? (
              <div className="form-grid">
                <Field label="Length" name="length"><select id="length" name="length" value={values.length} onChange={update}>{["8 inches", "10 inches", "12 inches", "14 inches", "16 inches", "18 inches", "20 inches", "22 inches", "24 inches", "Custom length"].map((item) => <option key={item}>{item}</option>)}</select></Field>
                <Field label="Colour" name="colour"><select id="colour" name="colour" value={values.colour} onChange={update}><option>Natural black</option><option>Dark brown</option><option>Custom colour</option><option>Not sure</option></select></Field>
                <Field label="Lace" name="lace"><select id="lace" name="lace" value={values.lace} onChange={update}><option>Not sure</option><option>No lace</option><option>4x4 Closure</option><option>5x5 Closure</option><option>13x4 Frontal</option><option>HD lace</option></select></Field>
                <Field label="Density" name="density"><select id="density" name="density" value={values.density} onChange={update}><option>150%</option><option>180%</option><option>200%</option><option>Not sure</option></select></Field>
                <Field label="Cap size" name="capSize"><select id="capSize" name="capSize" value={values.capSize} onChange={update}><option>Small</option><option>Medium</option><option>Large</option><option>Custom / not sure</option></select></Field>
                <Field label="Glueless preference" name="glueless"><select id="glueless" name="glueless" value={values.glueless} onChange={update}><option>Yes</option><option>No</option><option>Not sure</option></select></Field>
                <Field label="Budget currency" name="budgetCurrency"><select id="budgetCurrency" name="budgetCurrency" value={values.budgetCurrency} onChange={update}><option>NGN</option><option>CAD</option></select></Field>
                <Field label="Budget range" name="budget" help="A budget helps Rosaline recommend realistic options."><input id="budget" name="budget" inputMode="numeric" value={values.budget} onChange={update} placeholder="e.g. 100,000–180,000" /></Field>
              </div>
            ) : null}
            {step === 3 ? (
              <div className="upload-panel"><label><ImagePlus size={34} /><strong>Add inspiration images</strong><span>Reference hairstyle, colour or screenshot · up to 3 files</span><input type="file" accept="image/*" multiple onChange={addFiles} /><em><Upload size={16} /> Choose images</em></label>{files.length ? <div className="upload-previews">{files.map((file, index) => <figure key={`${file.name}-${index}`}><img src={file.preview} alt={`Selected preview ${index + 1}`} /><figcaption>{file.name}</figcaption><button className="icon-button" type="button" onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`}><X size={16} /></button></figure>)}</div> : <p>No files selected. You can continue without an image.</p>}<p className="order-notice"><strong>Privacy:</strong> inspiration images are previewed on your device only and are not uploaded.</p></div>
            ) : null}
            {step === 4 ? (
              <div className="form-grid">
                <Field label="Country" name="country" required><select id="country" name="country" value={values.country} onChange={update}><option>Canada</option><option>Nigeria</option><option>Other international location</option></select></Field>
                <Field label="City" name="city" required><input id="city" name="city" value={values.city} onChange={update} autoComplete="address-level2" /></Field>
                <Field label="Needed-by date" name="neededBy" help="Requested dates are confirmed after review."><input id="neededBy" name="neededBy" type="date" value={values.neededBy} onChange={update} /></Field>
                <Field label="Delivery or pickup" name="delivery"><select id="delivery" name="delivery" value={values.delivery} onChange={update}><option>Delivery</option><option>Pickup — if available</option></select></Field>
              </div>
            ) : null}
            {step === 5 ? (
              <div className="wizard-review">
                <div className="review-summary"><ReviewRow label="Hair type" value={values.hairType} /><ReviewRow label="Style" value={values.style} /><ReviewRow label="Specifications" value={`${values.length} · ${values.colour} · ${values.lace} · ${values.density} · ${values.capSize}`} /><ReviewRow label="Budget" value={`${values.budgetCurrency} ${values.budget || "not specified"}`} /><ReviewRow label="Inspiration" value={files.length ? files.map((file) => file.name).join(", ") : "No image attached"} /><ReviewRow label="Delivery" value={`${values.city}, ${values.country} · ${values.delivery}`} /></div>
                <div className="form-grid">
                  <Field label="First name" name="firstName" required><input id="firstName" name="firstName" value={values.firstName} onChange={update} autoComplete="given-name" /></Field>
                  <Field label="Last name" name="lastName"><input id="lastName" name="lastName" value={values.lastName} onChange={update} autoComplete="family-name" /></Field>
                  <Field label="Email" name="email" required><input id="email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" /></Field>
                  <Field label="Phone or WhatsApp" name="phone" required><input id="phone" name="phone" type="tel" value={values.phone} onChange={update} autoComplete="tel" /></Field>
                  <Field label="Anything else Rosaline should know?" name="notes"><textarea id="notes" name="notes" rows="4" value={values.notes} onChange={update} /></Field>
                </div>
                <OrderNotice compact />
              </div>
            ) : null}
            <div className="wizard__actions">{step > 0 ? <button className="button button--ghost" type="button" onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Back</button> : <span></span>}{step < 5 ? <button className="button button--primary" type="button" onClick={next}>Continue <ArrowRight size={18} /></button> : <button className="button button--primary" type="button" onClick={submit}><Sparkles size={18} /> Submit custom request</button>}</div>
          </div>
        </div>
      </section>
    </>
  );
}

const stepTitles = ["What are we creating?", "Choose your texture", "Shape the details", "Show us your inspiration", "Where is it going?", "Review your custom request"];
const stepDescriptions = ["Start with the hair format that best fits your routine.", "Pick the closest finish. You can refine it with a reference image later.", "These choices help Rosaline understand the look, fit and budget.", "A visual reference can communicate shape, colour and finish quickly.", "Share the destination and timing so availability can be discussed.", "Confirm the summary and add the best contact details for follow-up."];

function ChoiceGrid({ options, value, onSelect, visual = false }) {
  const visualImages = ["/images/products/long-straight-08.webp", "/images/products/body-wave-11.webp", "/images/products/deep-wave-curly-01.webp", "/images/products/natural-curl-04.webp", "/images/products/kinky-curly-02.webp", "/images/products/loose-curl-03.webp", "/images/editorial/hair-bundles-pink.webp"];
  return <div className={`choice-grid ${visual ? "choice-grid--visual" : ""}`}>{options.map((option, index) => <button className={value === option ? "is-active" : ""} type="button" onClick={() => onSelect(option)} key={option}>{visual ? <img src={visualImages[index]} alt="" width="260" height="210" /> : null}<span>{option}</span>{value === option ? <Check size={18} /> : null}</button>)}</div>;
}

function ReviewRow({ label, value }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}
