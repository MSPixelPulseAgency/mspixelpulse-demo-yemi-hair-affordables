import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Heart, HelpCircle, MessageCircle, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import { Accordion, Price, Quantity, Rating, SectionHeading } from "../components/common";
import { businessConfig, formatMoney } from "../config/business";
import { getProductBySlug, products } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const { addToCart, currency, wishlist, toggleWishlist, rememberProduct, recentlyViewed } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState(() => product ? ({
    length: product.availableLengths[0],
    laceType: product.laceTypes[0],
    density: product.densityOptions[0],
    capSize: product.capSizes[1],
    colour: product.colour
  }) : {});

  useEffect(() => {
    if (product) rememberProduct(product.id);
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const schema = useMemo(() => product ? ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((source) => `${businessConfig.siteUrl}${source}`),
    description: product.description,
    brand: { "@type": "Brand", name: businessConfig.name },
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: currency === "NGN" ? product.priceNGN : product.priceCAD,
      availability: "https://schema.org/PreOrder",
      url: `${businessConfig.siteUrl}/shop/${product.slug}`
    }
  }) : null, [product, currency]);

  if (!product) return <div className="container empty-state page-empty"><h1>Style not found</h1><p>This demo product may have moved.</p><Link className="button button--primary" to="/shop">Return to shop</Link></div>;
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.texture === product.texture)).slice(0, 4);
  const recent = recentlyViewed.filter((id) => id !== product.id).map((id) => products.find((item) => item.id === id)).filter(Boolean).slice(0, 4);
  const setOption = (key, value) => setOptions((current) => ({ ...current, [key]: value }));
  const add = () => addToCart(product, { ...options, quantity });
  const buyNow = () => { add(); navigate("/checkout"); };
  const details = [
    ["Product details", product.description],
    ["Hair specifications", `${product.texture} demo style in ${product.colour}. Available demo lengths: ${product.availableLengths.join(", ")}. Lace choices: ${product.laceTypes.join(", ")}.`],
    ["What is included", "One selected demo wig or hair item. Packaging and accessories will be confirmed before fulfilment."],
    ["Care instructions", product.careInstructions],
    ["Processing and delivery", `${product.estimatedProcessingTime}. This is a demo estimate and will be confirmed for your destination.`],
    ["Returns and exchanges", "Eligibility depends on the confirmed hygiene and custom-order policy. Review the final terms before payment."]
  ];

  return (
    <>
      <Seo title={product.name} description={`${product.shortDescription} View demo CAD and NGN pricing, lengths, lace and cap-size options.`} path={`/shop/${product.slug}`} image={product.images[0]} schema={schema} />
      <div className="container breadcrumb"><Link to="/shop"><ArrowLeft size={15} /> Shop</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.shortName}</span></div>
      <section className="container product-detail">
        <div className="product-gallery">
          <div className="product-gallery__main"><img src={product.images[activeImage]} alt={`${product.name} demo style, image ${activeImage + 1} of ${product.images.length}`} width="800" height="980" /><span>{activeImage + 1} / {product.images.length}</span></div>
          <div className="product-gallery__thumbs">{product.images.map((source, index) => <button type="button" className={activeImage === index ? "is-active" : ""} onClick={() => setActiveImage(index)} key={source} aria-label={`Show product image ${index + 1}`}><img src={source} alt="" width="100" height="124" /></button>)}</div>
        </div>
        <div className="product-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <Rating rating={product.rating} count={product.reviewCount} />
          <Price product={product} large />
          <p className="currency-note">Prices are shown in {currency}. Final payment and delivery details will be confirmed before fulfilment.</p>
          <p className="product-info__lead">{product.shortDescription}</p>
          <div className="stock-line"><Check size={17} /> {product.stockStatus} <span>· Availability must be confirmed</span></div>
          <OptionButtons label="Length" values={product.availableLengths} value={options.length} onChange={(value) => setOption("length", value)} />
          <OptionButtons label="Lace type" values={product.laceTypes} value={options.laceType} onChange={(value) => setOption("laceType", value)} />
          <OptionButtons label="Density" values={product.densityOptions} value={options.density} onChange={(value) => setOption("density", value)} />
          <OptionButtons label="Cap size" values={product.capSizes} value={options.capSize} onChange={(value) => setOption("capSize", value)} />
          <div className="product-buy-row"><Quantity value={quantity} onChange={setQuantity} /><button className="button button--primary" type="button" onClick={add}><ShoppingBag size={18} /> Add to cart</button><button className={`icon-button wishlist-large ${wishlist.includes(product.id) ? "is-active" : ""}`} type="button" onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist"><Heart fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button></div>
          <button className="button button--dark button--full" type="button" onClick={buyNow}>Order this style</button>
          <Link className="button button--whatsapp button--full" to="/contact"><MessageCircle size={18} /> Ask Rosaline a question</Link>
          <div className="service-points"><p><Truck /><span><strong>{product.estimatedProcessingTime}</strong>Confirmed after request</span></p><p><ShieldCheck /><span><strong>No card details collected</strong>Payment method confirmed securely later</span></p><p><HelpCircle /><span><strong>Need help choosing?</strong>Use the hair guide or contact page</span></p></div>
          <Accordion items={details} allowMultiple />
        </div>
      </section>
      <div className="mobile-buy-bar"><div><small>{product.shortName}</small><strong>{formatMoney(currency === "NGN" ? product.priceNGN : product.priceCAD, currency)}</strong></div><button className="button button--primary" type="button" onClick={add}>Add to cart</button></div>
      <section className="section section--surface"><div className="container"><SectionHeading eyebrow="You may also like" title="Continue the edit" /><div className="product-grid product-grid--four">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></div></section>
      {recent.length ? <section className="section"><div className="container"><SectionHeading title="Recently viewed" /><div className="product-grid product-grid--four">{recent.map((item) => <ProductCard product={item} key={item.id} />)}</div></div></section> : null}
    </>
  );
}

function OptionButtons({ label, values, value, onChange }) {
  return (
    <fieldset className="option-group"><legend>{label} <span>{value}</span></legend><div>{values.map((option) => <button type="button" className={value === option ? "is-active" : ""} onClick={() => onChange(option)} key={option}>{option}</button>)}</div></fieldset>
  );
}
