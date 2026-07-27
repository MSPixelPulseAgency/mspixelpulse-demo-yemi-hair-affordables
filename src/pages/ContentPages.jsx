import { createElement, useMemo, useRef, useState } from "react";
import { ArrowRight, CircleHelp, Globe2, HeartHandshake, Mail, MessageCircle, Ruler, Scissors, ShieldCheck, Sparkles, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LoopingVideo, { VideoFeature } from "../components/LoopingVideo";
import Seo from "../components/Seo";
import { Accordion, Field, OrderNotice, SectionHeading } from "../components/common";
import { businessConfig } from "../config/business";
import { faqGroups } from "../data/faq";

export function AboutPage() {
  return (
    <>
      <Seo title="About Rosaline" description="Meet Rosaline and learn the simple idea behind Yemi Hair Affordables: stylish hair, fair pricing and personal guidance." path="/about" />
      <header className="about-hero">
        <div className="container about-hero__grid"><div><p className="eyebrow">Meet the brand</p><h1>Hair should feel like confidence, not compromise.</h1><p>Yemi Hair Affordables brings together beautiful, confidence-boosting styles with clear choices and personal guidance.</p><Link className="button button--primary" to="/shop">Explore the shop <ArrowRight size={18} /></Link></div><div><img src="/images/editorial/natural-hair-dark.webp" alt="Black woman wearing full natural hair" width="760" height="880" /><span>Selected with care<br /><strong>For everyday confidence</strong></span></div></div>
      </header>
      <section className="section"><div className="container story-grid"><div><p className="eyebrow">The simple idea</p><h2>Beautiful options. Clear guidance. A more personal order.</h2></div><div><p>The focus is simple: stylish options, fair pricing, personal guidance and an easier ordering experience. Browse by texture and shape, compare prices in NGN or CAD, or build a custom request when the exact look is not listed.</p><p>Every order is reviewed before payment so the style, specifications, availability and delivery details are clear.</p></div></div></section>
      <VideoFeature
        src="/videos/natural-hair-portrait.mp4"
        poster="/images/video-posters/natural-hair-portrait.webp"
        label="Black woman wearing and moving her natural hair"
        eyebrow="Confidence in motion"
        title="The look matters. How it makes you feel matters more."
        text="Yemi Hair Affordables is built around expressive texture, personal guidance and styles that work in real routines."
        href="/custom-order"
        cta="Start a quick request"
      />
      <section className="section section--blush"><div className="container"><SectionHeading eyebrow="What guides the brand" title="A thoughtful kind of affordable" align="center" /><div className="value-grid">{[[HeartHandshake, "Personal support", "Help with texture, length, lace and fit before payment."], [Sparkles, "Style without pressure", "Premium-feeling choices explained in plain language."], [ShieldCheck, "Clear expectations", "Order details and final terms are confirmed before payment."], [Globe2, "Two markets in mind", "A browsing experience designed for Nigeria and Canada."]].map(([Icon, title, text]) => <article key={title}>{createElement(Icon)}<h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
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
      <section className="section" id="guide-start"><div className="container"><SectionHeading eyebrow="Length" title="Think in shape, not just inches" text="Curl pattern and height change where a length sits. These ranges are a starting point only." /><div className="length-guide">{[["8–10 in", "Chin / short bob", "/images/products/short-bob-05.webp"], ["12–14 in", "Shoulder / midi", "/images/products/soft-wave-13.webp"], ["16–18 in", "Chest length", "/images/products/body-wave-11.webp"], ["20–24 in", "Long statement", "/images/products/long-straight-08.webp"]].map(([length, label, image]) => <article key={length}><img src={image} alt={`${label} hairstyle length`} loading="lazy" width="400" height="520" /><div><strong>{length}</strong><span>{label}</span></div></article>)}</div></div></section>
      <section className="section section--surface"><div className="container"><SectionHeading eyebrow="Lace" title="Closure or frontal?" text="Both can look polished. The best choice depends on how much styling flexibility you want." /><div className="comparison"><article><span><ShieldCheck /> Simpler routine</span><h3>Closure</h3><p>Covers a smaller section of the front and usually focuses the parting area.</p><ul><li>Often beginner friendly</li><li>Less lace to blend</li><li>Usually lower maintenance</li></ul></article><article><span><Sparkles /> More versatility</span><h3>Frontal</h3><p>Extends across more of the hairline and supports more parting choices.</p><ul><li>Flexible styling</li><li>More hairline coverage</li><li>May need more maintenance</li></ul></article></div></div></section>
      <section className="section"><div className="container guide-cards"><GuideCard icon={Scissors} title="Glueless vs installed" text="Glueless options are designed for easier removal and everyday flexibility. Installed wigs can offer a longer-wear finish but may need more maintenance." /><GuideCard icon={Sparkles} title="Texture" text="Straight feels sleek, body wave adds soft movement and curls bring more volume. Tighter curls appear shorter at the same stated length." /><GuideCard icon={Ruler} title="Density" text="150% feels lighter, 180% offers balanced fullness and 200% creates a fuller statement. More is not always more natural." /><GuideCard icon={CircleHelp} title="Cap size" text="Measure around the hairline, front to nape and ear to ear. If measurements disagree, ask before choosing." /></div></section>
      <section className="section section--blush"><div className="container care-grid"><div className="care-grid__video"><LoopingVideo src="/videos/natural-curl-care.mp4" poster="/images/video-posters/natural-curl-care.webp" label="Black woman gently refreshing and shaping her curls" /></div><div><p className="eyebrow">Human-hair basics</p><h2>A gentle routine protects the finish.</h2><ol><li><span>1</span><div><h3>Detangle from the ends</h3><p>Support the hair and work upward with patience.</p></div></li><li><span>2</span><div><h3>Use lightweight products</h3><p>Avoid heavy buildup that makes movement feel dull.</p></div></li><li><span>3</span><div><h3>Keep heat moderate</h3><p>Use heat protectant when the product is confirmed heat-safe.</p></div></li><li><span>4</span><div><h3>Store with shape</h3><p>Use a stand or satin bag away from friction and direct sunlight.</p></div></li></ol><small className="media-note">Inspiration footage from Pexels; not a customer order or a specific product.</small></div></div></section>
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
      <Seo title="Frequently Asked Questions" description="Answers about Yemi Hair Affordables pricing, currencies, hair, ordering, delivery and returns." path="/faq" schema={schema} />
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
  const submit = async (event) => {
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
    const summary = [`Yemi Hair Affordables enquiry`, `Name: ${values.name}`, `Email: ${values.email}`, `Phone: ${values.phone || "Not provided"}`, `Topic: ${values.topic}`, "", values.message].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Your enquiry summary has been copied. Share it through Yemi Hair’s confirmed contact channel.");
    } catch {
      setStatus("Your enquiry summary is ready. Please copy your message before leaving this page.");
    }
    setValues({ ...values, message: "", consent: false });
  };
  return (
    <>
      <Seo title="Contact & Hair Support" description="Ask Rosaline about wig length, texture, lace, cap size, custom orders, Canada or Nigeria delivery." path="/contact" />
      <header className="contact-hero"><div className="container"><p className="eyebrow">Personal support</p><h1>Let’s find the right hair for you.</h1><p>Share the style you like and the details you are unsure about. No pressure, no complicated wording.</p></div></header>
      <section className="section section--tight"><div className="container contact-layout">
        <div className="contact-details"><p className="eyebrow">Order support</p><h2>Ask with confidence.</h2><p>Use the guided order tools to keep every product, fit and delivery detail together.</p>
          {businessConfig.email ? <a href={`mailto:${businessConfig.email}`}><Mail /><span><strong>Email</strong>{businessConfig.email}</span></a> : null}
          {businessConfig.whatsappNumber ? <a href={`https://wa.me/${businessConfig.whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle /><span><strong>WhatsApp</strong>Message Yemi Hair Affordables</span></a> : null}
          <div><Store /><span><strong>Service area</strong>Canada, Nigeria and selected locations</span></div>
          <Link className="button button--ghost button--full" to="/faq">Read frequently asked questions</Link>
          <OrderNotice compact />
        </div>
        <form className="contact-form" onSubmit={submit} noValidate ref={formRef}><h2>Prepare an enquiry</h2><p>This creates a copyable summary on your device; it does not send automatically.</p>
          <Field label="Name" name="name" required error={errors.name}><input id="name" name="name" value={values.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} /></Field>
          <Field label="Email" name="email" required error={errors.email}><input id="email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} /></Field>
          <Field label="Phone or WhatsApp" name="phone"><input id="phone" name="phone" type="tel" value={values.phone} onChange={update} autoComplete="tel" /></Field>
          <Field label="What can we help with?" name="topic"><select id="topic" name="topic" value={values.topic} onChange={update}><option>Product guidance</option><option>Custom order follow-up</option><option>Order status</option><option>Delivery question</option><option>Returns question</option><option>Other</option></select></Field>
          <Field label="Message" name="message" required error={errors.message}><textarea id="message" name="message" rows="6" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} placeholder="Include the product name, desired length and your question." /></Field>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website" value={values.website} onChange={update} tabIndex="-1" autoComplete="off" /></label></div>
          <label className="consent-check"><input type="checkbox" name="consent" checked={values.consent} onChange={update} aria-invalid={Boolean(errors.consent)} /><span>I agree to be contacted about this enquiry.</span></label>{errors.consent ? <p className="field__error" role="alert">{errors.consent}</p> : null}
          <button className="button button--primary button--full" type="submit">Prepare enquiry summary <ArrowRight size={18} /></button><p className="form-status" role="status">{status}</p>
        </form>
      </div></section>
    </>
  );
}

const policyContent = {
  privacy: {
    title: "Privacy policy",
    description: "Privacy information for Yemi Hair Affordables.",
    intro: "This website stores limited information in your browser to support shopping, saved preferences and order summaries.",
    sections: [
      ["Information you provide", "Order, custom-request and enquiry forms may ask for your name, email, phone, delivery details and hair preferences. These summaries are stored on this device unless you choose to share them."],
      ["Browser storage", "Currency choice, cart contents, recently viewed products and order summaries use local storage. You can clear this data through your browser settings."],
      ["Payments", "This website does not collect, process or store card or banking information."],
      ["Contact", "Only share personal information through a contact channel you have confirmed belongs to Yemi Hair Affordables."]
    ]
  },
  terms: {
    title: "Terms of use",
    description: "Terms for browsing and creating order requests with Yemi Hair Affordables.",
    intro: "This catalogue helps you browse styles and prepare an order summary. A submitted or copied summary does not create a confirmed sale.",
    sections: [
      ["Order requests", "Submitting a request does not create a confirmed sale. Product availability, final price, customization, payment method and delivery terms must be confirmed directly."],
      ["Product representation", "Photography represents hairstyle, texture and finish references and may not depict the exact unit supplied."],
      ["Payment", "No payment is taken on this website. Never send card or banking details through an enquiry form."],
      ["Changes", "Catalogue details may be updated. The terms confirmed with your order apply to that purchase."]
    ]
  },
  "shipping-returns": {
    title: "Shipping & returns",
    description: "Shipping, processing and return guidance for Yemi Hair Affordables.",
    intro: "Shipping, processing and return details are confirmed for your item and destination before payment.",
    sections: [
      ["Processing", "Customization, availability and order volume can affect timing. Your expected processing window is confirmed with your order."],
      ["Delivery", "Service may be available within Nigeria, Canada and selected international locations. Destination, carrier, fees, duties and pickup options are confirmed before payment."],
      ["Returns and hygiene", "Wigs and hair products may have hygiene-related return restrictions. Ask for the applicable return conditions before payment."],
      ["Custom orders", "Custom-made or altered products may have different cancellation and return conditions. Review and accept those terms before payment."],
      ["Order issues", "If a wrong or damaged item is received, contact the business promptly with your order reference and clear photos."]
    ]
  }
};

export function PolicyPage({ type }) {
  const policy = policyContent[type];
  return (
    <>
      <Seo title={policy.title} description={policy.description} path={`/${type}`} />
      <header className="page-hero page-hero--compact"><div className="container"><p className="eyebrow">Important information</p><h1>{policy.title}</h1><p>Last updated: July 2026</p></div></header>
      <article className="container policy"><p className="policy__intro">{policy.intro}</p>{policy.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<OrderNotice /><p>Questions? <Link className="text-link" to="/contact">Contact support</Link>.</p></article>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="Return to the Yemi Hair Affordables shop or homepage." path="/404" />
      <section className="not-found container"><div><p className="eyebrow">404 — lost strand</p><h1>This page slipped out of place.</h1><p>The look you want may still be in the shop—or Rosaline can help you request it.</p><div><Link className="button button--primary" to="/shop">Shop hair</Link><Link className="button button--ghost" to="/">Return home</Link></div></div><img src="/images/products/kinky-curly-02.webp" alt="Black woman wearing full curly hair" width="620" height="760" /></section>
    </>
  );
}
