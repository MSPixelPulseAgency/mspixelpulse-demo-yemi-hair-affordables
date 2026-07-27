import { createElement, useState } from "react";
import { ArrowRight, CircleDollarSign, Globe2, HandHeart, Scissors, SlidersHorizontal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import { DemoNotice, Reveal, SectionHeading } from "../components/common";
import { collections } from "../data/collections";
import { products } from "../data/products";
import { reviews } from "../data/reviews";
import { businessConfig } from "../config/business";

const textureCards = [
  ["Silky Straight", "/images/products/long-straight-08.webp"],
  ["Body Wave", "/images/products/body-wave-11.webp"],
  ["Deep Wave", "/images/products/deep-wave-curly-01.webp"],
  ["Kinky Curly", "/images/products/kinky-curly-02.webp"],
  ["Loose Curl", "/images/products/loose-curl-03.webp"],
  ["Natural Bob", "/images/products/short-bob-05.webp"]
];

const benefits = [
  [CircleDollarSign, "Beautiful, affordable styles", "Premium feeling choices with demo prices shown clearly."],
  [Sparkles, "Carefully selected hair", "A considered edit of textures, lengths and finishes."],
  [HandHeart, "Custom order support", "Personal guidance when the exact style is not in the shop."],
  [Globe2, "Canada & Nigeria pricing", "Switch between separate CAD and NGN prices at any time."]
];

function Newsletter() {
  const [values, setValues] = useState({ firstName: "", email: "" });
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      setMessage("Enter a valid email address to join the demo list.");
      return;
    }
    setMessage("You’re on the demo list. Live email delivery will be connected before launch.");
    setValues({ firstName: "", email: "" });
  };
  return (
    <form className="newsletter__form" onSubmit={submit} noValidate>
      <label><span>First name <small>(optional)</small></span><input value={values.firstName} onChange={(event) => setValues({ ...values, firstName: event.target.value })} autoComplete="given-name" /></label>
      <label><span>Email address</span><input type="email" required value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} autoComplete="email" aria-describedby="newsletter-status" /></label>
      <button className="button button--dark" type="submit">Join the list</button>
      <p className="newsletter__consent">By joining, you agree to receive occasional demo updates. Unsubscribe anytime.</p>
      <p id="newsletter-status" role="status">{message}</p>
    </form>
  );
}

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 8);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessConfig.name,
    description: businessConfig.tagline,
    url: businessConfig.siteUrl,
    email: businessConfig.email,
    areaServed: ["Canada", "Nigeria"]
  };
  return (
    <>
      <Seo
        title="Yemi Hair Affordables | Wigs & Human Hair in Canada and Nigeria"
        description="Shop affordable wigs, virgin hair, bob wigs, curly hair, straight human-hair styles and custom hair orders from Yemi Hair Affordables. Prices available in CAD and NGN."
        path="/"
        schema={organizationSchema}
      />
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Selected with care by Rosaline</p>
            <h1>Your perfect hair, <em>without the luxury markup.</em></h1>
            <p>Shop beautiful wigs and human-hair styles selected to help you look confident, polished and effortlessly you.</p>
            <div className="hero__actions"><Link className="button button--primary" to="/shop">Shop hair <ArrowRight size={18} /></Link><Link className="button button--ghost" to="/custom-order">Place a custom order</Link></div>
            <div className="hero__trust"><span><Sparkles size={16} /> Demo-safe product edit</span><span><Globe2 size={16} /> Canada & Nigeria welcome</span></div>
          </div>
          <div className="hero__visual">
            <div className="hero__image hero__image--main"><img src="/images/products/long-straight-08.webp" alt="Woman wearing a long straight hairstyle, shown as a demo style reference" width="760" height="960" /></div>
            <div className="hero__image hero__image--small"><img src="/images/products/deep-wave-curly-01.webp" alt="Woman with deep curly hair, shown as a demo texture reference" width="480" height="600" /></div>
            <div className="hero__floating"><span>From</span><strong>$89 CAD</strong><small>demo pricing</small><Link to="/shop/classic-short-bob-wig">View classic bob <ArrowRight size={14} /></Link></div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHeading eyebrow="Find your finish" title="Shop by category" text="From sharp bobs to soft curls, start with the look that feels most like you." action={<Link className="text-link" to="/collections">View all collections <ArrowRight size={16} /></Link>} />
          <div className="category-grid">
            {collections.map((collection) => (
              <Reveal key={collection.slug}>
                <Link className="category-card" to={`/collections/${collection.slug}`}>
                  <img src={collection.image} alt={`${collection.name} demo collection`} loading="lazy" width="480" height="620" />
                  <span className="category-card__overlay"><small>{collection.description}</small><strong>{collection.name}</strong><em>Explore <ArrowRight size={16} /></em></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The customer edit" title="Best-selling looks" text="Versatile silhouettes and textures chosen for easy confidence." action={<Link className="text-link" to="/shop?sort=best">Shop all hair <ArrowRight size={16} /></Link>} />
          <div className="product-grid product-grid--four">{featured.map((product) => <ProductCard product={product} key={product.id} />)}</div>
          <DemoNotice compact />
        </div>
      </section>

      <Reveal>
        <section className="split-banner">
          <div className="split-banner__image"><img src="/images/products/soft-wave-13.webp" alt="Model with soft wavy hair, shown as a demo everyday wig style" loading="lazy" width="900" height="800" /></div>
          <div className="split-banner__content"><p className="eyebrow">The everyday edit</p><h2>Soft, polished, everyday confidence.</h2><p>Easy-to-wear styles that look considered without making your morning complicated.</p><Link className="button button--light" to="/collections/everyday-wigs">Shop everyday wigs <ArrowRight size={18} /></Link></div>
        </section>
      </Reveal>

      <section className="section section--blush">
        <div className="container">
          <SectionHeading eyebrow="Why Yemi Hair" title="Style, support and fair choices" align="center" />
          <div className="benefit-grid">{benefits.map(([Icon, title, text]) => <div className="benefit-card" key={title}>{createElement(Icon)}<h3>{title}</h3><p>{text}</p></div>)}</div>
        </div>
      </section>

      <section className="section texture-section">
        <div className="container">
          <SectionHeading eyebrow="Choose your texture" title="Made to move like you do" text="Compare six popular finishes, then refine the length and lace on the product page." />
          <div className="texture-grid">{textureCards.map(([name, source]) => <Link to={`/shop?search=${encodeURIComponent(name)}`} key={name}><img src={source} alt={`${name} demo hair texture`} loading="lazy" width="420" height="520" /><span>{name}<ArrowRight size={16} /></span></Link>)}</div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHeading eyebrow="Shop the look" title="An editorial view of everyday hair" text="Tap through to see the closest demo style in the collection." />
          <div className="look-grid">
            <article className="look-card look-card--large"><img src="/images/products/lace-straight-14.webp" alt="Long straight lace hairstyle demo look" loading="lazy" width="800" height="980" /><span className="look-card__hotspot" aria-hidden="true"></span><div><p>Polished lengths</p><h3>HD Lace Straight Wig</h3><Link className="button button--light" to="/shop/hd-lace-straight-wig">Shop the look</Link></div></article>
            <article className="look-card"><img src="/images/products/natural-curl-04.webp" alt="Soft natural curl hairstyle demo look" loading="lazy" width="800" height="980" /><span className="look-card__hotspot" aria-hidden="true"></span><div><p>Soft definition</p><h3>Water Wave Everyday Wig</h3><Link className="button button--light" to="/shop/water-wave-everyday-wig">Shop the look</Link></div></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container custom-banner">
          <div><p className="eyebrow">Built around you</p><h2>Can’t find your exact style?</h2><p>Tell Rosaline your preferred texture, length, colour, cap size, budget and delivery location.</p><Link className="button button--primary" to="/custom-order">Start custom order <ArrowRight size={18} /></Link></div>
          <div className="custom-banner__visual"><img src="/images/editorial/hair-bundles-pink.webp" alt="Hair extension bundles on a soft pink surface" loading="lazy" width="760" height="620" /><span><SlidersHorizontal /> Six guided steps</span></div>
        </div>
      </section>

      <section className="section section--dark reviews">
        <div className="container">
          <SectionHeading eyebrow="Demo customer stories" title="Good hair days, shared" text="Sample review content to demonstrate the final experience. Replace with confirmed feedback before launch." />
          <div className="reviews__track">{reviews.map((review) => <article className="review-card" key={review.id}><div className="review-card__stars" aria-label={`${review.rating} stars`}>★★★★★</div><blockquote>“{review.text}”</blockquote><p><strong>{review.name}</strong><span>{review.location} · {review.product}</span></p><small>Demo review</small></article>)}</div>
        </div>
      </section>

      <section className="section social-gallery">
        <div className="container">
          <SectionHeading eyebrow="Follow the mood" title="Our latest looks" text="A curated demo feed—not connected to a live social account." action={<a className="text-link" href={businessConfig.instagram}>Instagram placeholder <ArrowRight size={16} /></a>} />
          <div className="social-grid">{products.slice(1, 9).map((product) => <Link key={product.id} to={`/shop/${product.slug}`}><img src={product.images[0]} alt={`${product.shortName} social gallery demo`} loading="lazy" width="420" height="420" /><span><Scissors size={18} /> View style</span></Link>)}</div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container newsletter__grid"><div><p className="eyebrow">Stay in the loop</p><h2>New drops, restocks and hair tips.</h2><p>Join the demo early-access list for style notes and first looks.</p></div><Newsletter /></div>
      </section>
    </>
  );
}
