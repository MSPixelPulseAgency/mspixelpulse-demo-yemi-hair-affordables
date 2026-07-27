import { createElement } from "react";
import { ArrowRight, CircleDollarSign, Globe2, HandHeart, Scissors, SlidersHorizontal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import { OrderNotice, Reveal, SectionHeading } from "../components/common";
import { collections } from "../data/collections";
import { products } from "../data/products";
import { businessConfig, formatMoney } from "../config/business";
import { useStore } from "../context/StoreContext";

const textureCards = [
  ["Silky Straight", "/images/products/long-straight-08.webp"],
  ["Body Wave", "/images/products/body-wave-11.webp"],
  ["Deep Wave", "/images/products/deep-wave-curly-01.webp"],
  ["Kinky Curly", "/images/products/kinky-curly-02.webp"],
  ["Loose Curl", "/images/products/loose-curl-03.webp"],
  ["Natural Bob", "/images/products/short-bob-05.webp"]
];

const benefits = [
  [CircleDollarSign, "Beautiful, affordable styles", "Clear prices and considered choices for everyday confidence."],
  [Sparkles, "Carefully selected hair", "A considered edit of textures, lengths and finishes."],
  [HandHeart, "Custom order support", "Personal guidance when the exact style is not in the shop."],
  [Globe2, "Canada & Nigeria pricing", "Switch between separate CAD and NGN prices at any time."]
];

const editorialLooks = [
  ["/images/editorial/natural-hair-dark.webp", "Natural volume", "/collections/curly-hair"],
  ["/images/editorial/afro-portrait.webp", "Soft afro texture", "/collections/curly-hair"],
  ["/images/editorial/nigerian-natural-hair.webp", "Silky natural finish", "/collections/straight-hair"],
  ["/images/editorial/nigerian-afro.webp", "Statement shape", "/collections/bob-wigs"],
  ["/images/products/long-straight-08.webp", "Polished length", "/collections/straight-hair"],
  ["/images/products/deep-wave-curly-01.webp", "Defined wave", "/collections/curly-hair"],
  ["/images/products/short-natural-06.webp", "Everyday bob", "/collections/bob-wigs"],
  ["/images/editorial/braided-hair.webp", "Copper braids", "/custom-order"]
];

export default function HomePage() {
  const { currency } = useStore();
  const featured = products.filter((product) => product.featured).slice(0, 8);
  const heroProduct = products[0];
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessConfig.name,
    description: businessConfig.tagline,
    url: businessConfig.siteUrl,
    ...(businessConfig.email ? { email: businessConfig.email } : {}),
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
            <div className="hero__trust"><span><Sparkles size={16} /> Curated textures and lengths</span><span><Globe2 size={16} /> NGN prices · CAD switch</span></div>
          </div>
          <div className="hero__visual">
            <div className="hero__image hero__image--main"><img src="/images/editorial/nigerian-natural-hair.webp" alt="Black woman wearing a smooth natural hairstyle" width="760" height="960" /></div>
            <div className="hero__image hero__image--small"><img src="/images/editorial/afro-portrait.webp" alt="Black woman wearing a full natural afro" width="480" height="600" /></div>
            <div className="hero__floating"><span>From</span><strong>{formatMoney(currency === "NGN" ? heroProduct.priceNGN : heroProduct.priceCAD, currency)}</strong><small>{currency} catalogue price</small><Link to="/shop/classic-short-bob-wig">View classic bob <ArrowRight size={14} /></Link></div>
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
                  <img src={collection.image} alt={`${collection.name} collection`} loading="lazy" width="480" height="620" />
                  <span className="category-card__overlay"><small>{collection.description}</small><strong>{collection.name}</strong><em>Explore <ArrowRight size={16} /></em></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The customer edit" title="Featured looks" text="Versatile silhouettes and textures chosen for easy confidence." action={<Link className="text-link" to="/shop">Shop all hair <ArrowRight size={16} /></Link>} />
          <div className="product-grid product-grid--four">{featured.map((product) => <ProductCard product={product} key={product.id} />)}</div>
          <OrderNotice compact />
        </div>
      </section>

      <Reveal>
        <section className="split-banner">
          <div className="split-banner__image"><img src="/images/products/soft-wave-13.webp" alt="Black woman wearing soft, wavy hair" loading="lazy" width="900" height="800" /></div>
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
          <div className="texture-grid">{textureCards.map(([name, source]) => <Link to={`/shop?search=${encodeURIComponent(name)}`} key={name}><img src={source} alt={`${name} hair texture`} loading="lazy" width="420" height="520" /><span>{name}<ArrowRight size={16} /></span></Link>)}</div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHeading eyebrow="Shop the look" title="An editorial view of everyday hair" text="Tap through to find the closest style in the collection." />
          <div className="look-grid">
            <article className="look-card look-card--large"><img src="/images/products/lace-straight-14.webp" alt="Black woman wearing long straight lace hair" loading="lazy" width="800" height="980" /><span className="look-card__hotspot" aria-hidden="true"></span><div><p>Polished lengths</p><h3>HD Lace Straight Wig</h3><Link className="button button--light" to="/shop/hd-lace-straight-wig">Shop the look</Link></div></article>
            <article className="look-card"><img src="/images/products/natural-curl-04.webp" alt="Black woman wearing soft natural curls" loading="lazy" width="800" height="980" /><span className="look-card__hotspot" aria-hidden="true"></span><div><p>Soft definition</p><h3>Water Wave Everyday Wig</h3><Link className="button button--light" to="/shop/water-wave-everyday-wig">Shop the look</Link></div></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container custom-banner">
          <div><p className="eyebrow">Built around you</p><h2>Can’t find your exact style?</h2><p>Tell Rosaline your preferred texture, length, colour, cap size, budget and delivery location.</p><Link className="button button--primary" to="/custom-order">Start custom order <ArrowRight size={18} /></Link></div>
          <div className="custom-banner__visual"><img src="/images/editorial/hair-bundles-pink.webp" alt="Hair extension bundles on a soft pink surface" loading="lazy" width="760" height="620" /><span><SlidersHorizontal /> Six guided steps</span></div>
        </div>
      </section>

      <section className="section section--dark editorial-story">
        <div className="container">
          <div className="editorial-story__grid">
            <div><p className="eyebrow">Made for your everyday</p><h2>Real texture. Real presence. Your own finish.</h2><p>Explore shapes that celebrate natural volume, polished lengths and the confidence to change your look when you choose.</p><Link className="button button--light" to="/collections">Explore collections <ArrowRight size={18} /></Link></div>
            <div className="editorial-story__images"><img src="/images/editorial/natural-hair-dark.webp" alt="Black woman with full natural hair against a dark background" loading="lazy" width="520" height="680" /><img src="/images/editorial/nigerian-afro.webp" alt="Nigerian woman wearing a rounded natural afro" loading="lazy" width="520" height="680" /><img src="/images/editorial/natural-hair-blue.webp" alt="Black woman with natural hair in an editorial portrait" loading="lazy" width="520" height="680" /></div>
          </div>
        </div>
      </section>

      <section className="section social-gallery">
        <div className="container">
          <SectionHeading eyebrow="Hair inspiration" title="Looks made to be noticed" text="Browse polished lengths, soft curls and natural textures worn by Black women." action={<Link className="text-link" to="/shop">Shop every style <ArrowRight size={16} /></Link>} />
          <div className="social-grid">{editorialLooks.map(([source, label, href]) => <Link key={`${source}-${label}`} to={href}><img src={source} alt={`Black woman wearing ${label.toLowerCase()}`} loading="lazy" width="420" height="420" /><span><Scissors size={18} /> {label}</span></Link>)}</div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container newsletter__grid"><div><p className="eyebrow">Need a closer match?</p><h2>Tell Rosaline exactly what you want.</h2><p>Share the texture, length, colour, lace preference, budget and destination in one guided request.</p></div><div className="newsletter__actions"><Link className="button button--dark" to="/custom-order">Start a custom order <ArrowRight size={18} /></Link><Link className="button button--ghost" to="/hair-guide">Read the hair guide</Link></div></div>
      </section>
    </>
  );
}
