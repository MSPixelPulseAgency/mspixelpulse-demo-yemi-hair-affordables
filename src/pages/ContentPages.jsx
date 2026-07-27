import { createElement, useMemo, useRef, useState } from "react";
import { ArrowRight, CircleHelp, Clock3, Globe2, HeartHandshake, Mail, MessageCircle, Ruler, Scissors, ShieldCheck, Sparkles, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { Accordion, DemoNotice, Field, SectionHeading } from "../components/common";
import { businessConfig } from "../config/business";
import { faqGroups } from "../data/faq";

export function AboutPage() {
  return (
    <>
      <Seo title="About Rosaline" description="Meet Rosaline and learn the simple idea behind Yemi Hair Affordables: stylish hair, fair pricing and personal guidance." path="/about" />
      <header className="about-hero">
        <div className="container about-hero__grid"><div><p className="eyebrow">Meet the founder</p><h1>Hair should feel like confidence, not compromise.</h1><p>Yemi Hair Affordables was created by Rosaline to make beautiful, confidence-boosting hair more accessible.</p><Link className="button button--primary" to="/shop">Explore the shop <ArrowRight size={18} /></Link></div><div><img src="/images/products/short-natural-06.webp" alt="Portrait used as a temporary demo placeholder for Rosaline" width="760" height="880" /><span>Owner image placeholder<br /><strong>Replace with Rosaline’s approved portrait</strong></span></div></div>
      </header>
      <section className="section"><div className="container story-grid"><div><p className="eyebrow">The simple idea</p><h2>Beautiful options. Clear guidance. A more personal order.</h2></div><div><p>The focus is simple: stylish options, fair pricing, personal guidance and an easier ordering experience. Customers can browse by texture and shape, compare prices in CAD or NGN, or build a custom request when the exact look is not listed.</p><p>This demo does not invent awards, years in business or customer numbers. The real story can grow here as Rosaline confirms it.</p></div></div></section>
      <section className="section section--blush"><div className="container"><SectionHeading eyebrow="What guides the brand" title="A thoughtful kind of affordable" align="center" /><div className="value-grid">{[[HeartHandshake, "Personal support", "Help with texture, length, lace and fit before payment."], [Sparkles, "Style without pressure", "Premium-feeling choices explained in plain language."], [ShieldCheck, "Clear expectations", "Demo details are labelled and final terms are confirmed."], [Globe2, "Two markets in mind", "A browsing experience designed for Canada and Nigeria."]].map(([Icon, title, text]) => <article key={title}>{createElement(Icon)}<h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section"><div className="container process-section"><div><p className="eyebrow">How we help</p><h2>From inspiration to confirmation.</h2><p>A straightforward path with room for real questions.</p></div><ol><li><span>01</span><div><h3>Browse the edit</h3><p>Start with product, collection or texture.</p></div></li><li><span>02</span><div><h3>Choose the details</h3><p>Select length, lace, density and cap size.</p></div></li><li><span>03</span><div><h3>Ask before ordering</h3><p>Use the guide or contact Rosaline for help.</p></div></li><li><span>04</span><div><h3>Confirm and fulfil</h3><p>Pricing, payment and delivery are confirmed directly.</p></div></li></ol></div></section>
      <section className="final-cta"><div className="container"><p className="eyebrow">Ready when you are</p><h2>Find your next look—or describe it to us.</h2><div><Link className="button button--light" to="/shop">Shop hair</Link><Link className="button button--outline-light" to="/custom-order">Request a custom style</Link></div></div></section>
    </>
  );
}

export function HairGuidePage() {
  const guideFaq = [
    ["What length looks most natural for a beginner?", "A bob or shoulder length can feel easy to manage. Your height, curl pattern and preferred finish also affect where a stated length falls."],
    ["Is a closure easier than a frontal?", "Often, yes. A closure has a smaller lace area and can be simpler to install and maintain. A frontal offers more parting flexibility."],
    ["How often should I wash a human-hair wig?", "Wash based on wear and product buildup rather than a rigid schedule. Use gentle products and avoid overloading the hair."],
    ["Can I sleep in my wig?", "Removing and storing it properly usually reduces tangling and friction. Ask for product-specific guidance if the wig is installed."]
  ];
  return (
    <>
      <Seo title="Hair Buying & Care Guide" description="Compare wig lengths, closure versus frontal, density, cap sizing, texture and beginner-friendly human-hair care." path="/hair-guide" />
      <header className="guide-hero"><div className="container guide-hero__grid"><div><p className="eyebrow">The Yemi Hair guide</p><h1>Choose well. Wear confidently. Care simply.</h1><p>A visual, beginner-friendly guide to the details that make a wig feel right.</p><a className="button button--light" href="#guide-start">Start with fit <ArrowRight size={18} /></a></div><img src="/images/editorial/hair-care-guide.webp" alt="Hair being styled with a curling tool in a salon" width="900" height="760" /></div></header>
      <section className="section" id="guide-start"><div className="container"><SectionHeading eyebrow="Length" title="Think in shape, not just inches" text="Curl pattern and height change where a length sits. These ranges are a starting point only." /><div className="length-guide">{[["8–10 in", "Chin / short bob", "/images/products/short-bob-05.webp"], ["12–14 in", "Shoulder / midi", "/images/products/soft-wave-13.webp"], ["16–18 in", "Chest length", "/images/products/body-wave-11.webp"], ["20–24 in", "Long statement", "/images/products/long-straight-08.webp"]].map(([length, label, image]) => <article key={length}><img src={image} alt={`${label} hairstyle length demo`} loading="lazy" width="400" height="520" /><div><strong>{length}</strong><span>{label}</span></div></article>)}</div></div></section>
      <section className="section section--surface"><div className="container"><SectionHeading eyebrow="Lace" title="Closure or frontal?" text="Both can look polished. The best choice depends on how much styling flexibility you want." /><div className="comparison"><article><span><ShieldCheck /> Simpler routine</span><h3>Closure</h3><p>Covers a smaller section of the front and usually focuses the parting area.</p><ul><li>Often beginner friendly</li><li>Less lace to blend</li><li>Usually lower maintenance</li></ul></article><article><span><Sparkles /> More versatility</span><h3>Frontal</h3><p>Extends across more of the hairline and supports more parting choices.</p><ul><li>Flexible styling</li><li>More hairline coverage</li><li>May need more maintenance</li></ul></article></div></div></section>
      <section className="section"><div className="container guide-cards"><GuideCard icon={Scissors} title="Glueless vs installed" text="Glueless options are designed for easier removal and everyday flexibility. Installed wigs can offer a longer-wear finish but may need more maintenance." /><GuideCard icon={Sparkles} title="Texture" text="Straight feels sleek, body wave adds soft movement and curls bring more volume. Tighter curls appear shorter at the same stated length." /><GuideCard icon={Ruler} title="Density" text="150% feels lighter, 180% offers balanced fullness and 200% creates a fuller statement. More is not always more natural." /><GuideCard icon={CircleHelp} title="Cap size" text="Measure around the hairline, front to nape and ear to ear. If measurements disagree, ask before choosing." /></div></section>
      <section className="section section--blush"><div className="container care-grid"><div><img src="/images/editorial/hair-bundles-pink.webp" alt="Hair bundles arranged on a soft pink surface" loading="lazy" width="760" height="680" /></div><div><p className="eyebrow">Human-hair basics</p><h2>A gentle routine protects the finish.</h2><ol><li><span>1</span><div><h3>Detangle from the ends</h3><p>Support the hair and work upward with patience.</p></div></li><li><span>2</span><div><h3>Use lightweight products</h3><p>Avoid heavy buildup that makes movement feel dull.</p></div></li><li><span>3</span><div><h3>Keep heat moderate</h3><p>Use heat protectant when the product is confirmed heat-safe.</p></div></li><li><span>4</span><div><h3>Store with shape</h3><p>Use a stand or satin bag away from friction and direct sunlight.</p></div></li></ol></div></div></section>
      <section className="section"><div className="container faq-narrow"><SectionHeading eyebrow="Beginner questions" title="A little clarity before you choose" /><Accordion items={guideFaq} /></div></section>
    </>
  );
}

function GuideCard({ icon: Icon, title, text }) {
  return <article>{createElement(Icon)}<h2>{title}</h2><p>{text}</p></article>;
}

export function FAQPage() {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) => group.items.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })))
  }), []);
  return (
    <>
      <Seo title="Frequently Asked Questions" description="Answers about Yemi Hair Affordables demo pricing, currencies, hair, ordering, delivery and returns." path="/faq" schema={schema} />
      <header className="page-hero"><div className="container"><p className="eyebrow">Helpful answers</p><h1>Questions are part of choosing well.</h1><p>Start here for the basics, then ask Rosaline about your exact style.</p></div></header>
      <section className="section"><div className="container faq-layout"><aside><h2>Browse topics</h2>{faqGroups.map((group) => <a href={`#faq-${group.group.toLowerCase()}`} key={group.group}>{group.group}</a>)}<div><MessageCircle /><h3>Still deciding?</h3><p>Send your product, length and questions together.</p><Link className="text-link" to="/contact">Contact support <ArrowRight size={16} /></Link></div></aside><div>{faqGroups.map((group) => <section className="faq-group" id={`faq-${group.group.toLowerCase()}`} key={group.group}><p className="eyebrow">{group.group}</p><h2>{group.group} questions</h2><Accordion items={group.items} /></section>)}</div></div></section>
    </>
  );
}

export function ContactPage() {
  const location = useLocation();
  const customReference = location.state?.customReference || "";
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", topic: customReference ? "Custom order follow-up" : "Product guidance", message: customReference ? `Hello, I created custom request ${customReference}.` : "", consent: false, website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const update = (event) => { const { name, value, type, checked } = event.target; setValues({ ...values, [name]: type === "checkbox" ? checked : value }); setErrors({ ...errors, [name]: "" }); };
  const submit = (event) => {
    event.preventDefault();
    if (values.website) return;
    const next = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email.";
    if (!values.message.trim()) next.message = "Tell us how we can help.";
    if (!values.consent) next.consent = "Please confirm consent before sending.";
    if (Object.keys(next).length) {
      setErrors(next);
      requestAnimationFrame(() => formRef.current?.querySelector("[aria-invalid='true']")?.focus());
      return;
    }
    setStatus("Thanks—your demo message is ready. Connect an email endpoint before launch to deliver it.");
    setValues({ ...values, message: "", consent: false });
  };
  return (
    <>
      <Seo title="Contact & Hair Support" description="Ask Rosaline about wig length, texture, lace, cap size, custom orders, Canada or Nigeria delivery." path="/contact" />
      <header className="contact-hero"><div className="container"><p className="eyebrow">Personal support</p><h1>Let’s find the right hair for you.</h1><p>Share the style you like and the details you are unsure about. No pressure, no complicated wording.</p></div></header>
      <section className="section section--tight"><div className="container contact-layout">
        <div className="contact-details"><p className="eyebrow">Ways to reach us</p><h2>Ask with confidence.</h2><p>Official business details can be connected in one configuration file before launch.</p>
          <a href={`mailto:${businessConfig.email}`}><Mail /><span><strong>Email</strong>{businessConfig.email}</span></a>
          <div><MessageCircle /><span><strong>WhatsApp</strong>{businessConfig.whatsappNumber ? "Connected" : "Confirmed number needed"}</span></div>
          <div><Clock3 /><span><strong>Business hours</strong>Placeholder — to be confirmed</span></div>
          <div><Store /><span><strong>Service area</strong>Canada, Nigeria and selected locations</span></div>
          <Link className="button button--ghost button--full" to="/faq">Read frequently asked questions</Link>
          <DemoNotice compact />
        </div>
        <form className="contact-form" onSubmit={submit} noValidate ref={formRef}><h2>Send a message</h2><p>We’ll keep your details together for follow-up.</p>
          <Field label="Name" name="name" required error={errors.name}><input id="name" name="name" value={values.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} /></Field>
          <Field label="Email" name="email" required error={errors.email}><input id="email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} /></Field>
          <Field label="Phone or WhatsApp" name="phone"><input id="phone" name="phone" type="tel" value={values.phone} onChange={update} autoComplete="tel" /></Field>
          <Field label="What can we help with?" name="topic"><select id="topic" name="topic" value={values.topic} onChange={update}><option>Product guidance</option><option>Custom order follow-up</option><option>Order status</option><option>Delivery question</option><option>Returns question</option><option>Other</option></select></Field>
          <Field label="Message" name="message" required error={errors.message}><textarea id="message" name="message" rows="6" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} placeholder="Include the product name, desired length and your question." /></Field>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" value={values.website} onChange={update} tabIndex="-1" autoComplete="off" /></label></div>
          <label className="consent-check"><input type="checkbox" name="consent" checked={values.consent} onChange={update} aria-invalid={Boolean(errors.consent)} /><span>I agree to be contacted about this enquiry.</span></label>{errors.consent ? <p className="field__error" role="alert">{errors.consent}</p> : null}
          <button className="button button--primary button--full" type="submit">Send demo message <ArrowRight size={18} /></button><p className="form-status" role="status">{status}</p>
        </form>
      </div></section>
    </>
  );
}

const policyContent = {
  privacy: {
    title: "Privacy policy",
    description: "Demo privacy information for Yemi Hair Affordables.",
    intro: "This demonstration website stores limited information in your browser to make the shopping experience work. It does not currently send form data to a live business system.",
    sections: [
      ["Information you provide", "Order, custom-request and contact forms may ask for your name, email, phone, delivery details and hair preferences. In demo mode, order requests are saved only in this browser’s local storage."],
      ["Browser storage", "Currency choice, cart contents, recently viewed products and demo orders use local storage. You can clear this data through your browser settings."],
      ["Payments", "This demo does not collect, process or store card or banking information."],
      ["Before launch", "A live privacy policy must name the actual services used for analytics, email, payments and fulfilment, and explain retention and contact rights."]
    ]
  },
  terms: {
    title: "Terms of use",
    description: "Demo terms for browsing and submitting requests to Yemi Hair Affordables.",
    intro: "This site is a demonstration. Products, prices, inventory, reviews, timelines and contact information are placeholders until confirmed by Rosaline.",
    sections: [
      ["Order requests", "Submitting a request does not create a confirmed sale. Product availability, final price, customization, payment method and delivery terms must be confirmed directly."],
      ["Product representation", "Photography represents styles and textures for demonstration purposes and may not depict confirmed inventory."],
      ["Payment", "No payment is taken on this demo site. Never send card details through the contact form."],
      ["Updates", "Final business terms should be reviewed and approved for the jurisdictions served before commercial launch."]
    ]
  },
  "shipping-returns": {
    title: "Shipping & returns",
    description: "Demo shipping, processing and return guidance for Yemi Hair Affordables.",
    intro: "The details below are placeholders for the final policy. They do not promise a delivery date, destination, refund or exchange.",
    sections: [
      ["Processing", "Product pages show demo processing ranges. Customization, availability and order volume may affect the confirmed timeline."],
      ["Delivery", "Canada, Nigeria and selected international service are intended, but exact areas, carriers, fees, duties and pickup options must be confirmed."],
      ["Returns and hygiene", "Wigs and hair products may have hygiene-related return restrictions. The final policy should explain acceptable condition, notice periods and exclusions."],
      ["Custom orders", "Custom-made or altered products may have different cancellation and return conditions. Review and accept the confirmed terms before payment."],
      ["Order issues", "If a wrong or damaged item is received, contact the business promptly with the order reference and clear photos. The final resolution process will be stated in the approved policy."]
    ]
  }
};

export function PolicyPage({ type }) {
  const policy = policyContent[type];
  return (
    <>
      <Seo title={policy.title} description={policy.description} path={`/${type}`} />
      <header className="page-hero page-hero--compact"><div className="container"><p className="eyebrow">Demo policy</p><h1>{policy.title}</h1><p>Last updated: July 2026 · Review before commercial launch</p></div></header>
      <article className="container policy"><p className="policy__intro">{policy.intro}</p>{policy.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<DemoNotice /><p>Questions? <Link className="text-link" to="/contact">Contact support</Link>.</p></article>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="Return to the Yemi Hair Affordables shop or homepage." path="/404" />
      <section className="not-found container"><div><p className="eyebrow">404 — lost strand</p><h1>This page slipped out of place.</h1><p>The look you want may still be in the shop—or Rosaline can help you request it.</p><div><Link className="button button--primary" to="/shop">Shop hair</Link><Link className="button button--ghost" to="/">Return home</Link></div></div><img src="/images/products/kinky-curly-02.webp" alt="Curly hair demo portrait" width="620" height="760" /></section>
    </>
  );
}
