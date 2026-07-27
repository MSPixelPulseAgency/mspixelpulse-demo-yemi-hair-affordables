import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import { VideoFeature } from "../components/LoopingVideo";
import { SectionHeading } from "../components/common";
import { collections } from "../data/collections";
import { products } from "../data/products";

export default function CollectionsPage() {
  const { slug } = useParams();
  if (slug) {
    const collection = collections.find((item) => item.slug === slug);
    if (!collection) return <div className="container empty-state page-empty"><h1>Collection not found</h1><Link className="button button--primary" to="/collections">View all collections</Link></div>;
    const matches = products.filter((product) => product.collections.includes(slug)
      || (slug === "lace-wigs" && ["Closure Wigs", "Frontal Wigs"].includes(product.category))
      || (slug === "premium-wigs" && product.category === "Premium Wigs")
      || (slug === "everyday-wigs" && product.category === "Everyday Wigs"));
    return (
      <>
        <Seo title={collection.name} description={`${collection.description} Browse styles with NGN and CAD pricing.`} path={`/collections/${slug}`} image={collection.image} />
        <header className="collection-hero"><img src={collection.image} alt={`${collection.name} collection`} width="1600" height="760" /><div className="container"><p className="eyebrow">Yemi Hair collection</p><h1>{collection.name}</h1><p>{collection.description}</p><span>{matches.length} styles</span></div></header>
        <VideoFeature
          compact
          src={slug === "curly-hair" ? "/videos/natural-curl-care.mp4" : "/videos/wig-styling.mp4"}
          poster={slug === "curly-hair" ? "/images/video-posters/natural-curl-care.webp" : "/images/video-posters/wig-styling.webp"}
          label={slug === "curly-hair" ? "Black woman refreshing and shaping her curls" : "Black woman fitting and styling a smooth wig"}
          eyebrow="Collection in motion"
          title={`See the ${collection.name.toLowerCase()} mood before you choose.`}
          text="Use the movement as inspiration, then open a product to select your available length, lace and fit."
          href="/custom-order"
          cta="Request a similar look"
        />
        <section className="section"><div className="container"><div className="product-grid product-grid--four">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>
      </>
    );
  }
  return (
    <>
      <Seo title="Hair Collections" description="Explore bob wigs, straight hair, curls, virgin hair, headband wigs, lace wigs and new arrivals." path="/collections" />
      <header className="page-hero"><div className="container"><p className="eyebrow">Find your finish</p><h1>Hair, grouped around your life.</h1><p>Start with shape, texture or ease—then choose the details that make it yours.</p></div></header>
      <VideoFeature
        src="/videos/afro-outdoors.mp4"
        poster="/images/video-posters/afro-outdoors.webp"
        label="Black woman wearing a rounded afro outdoors"
        eyebrow="Texture in real movement"
        title="Find the silhouette that feels most like you."
        text="See how volume changes a look, then browse each collection by shape, texture and everyday ease."
        href="/collections/curly-hair"
        cta="Explore curly hair"
      />
      <section className="section"><div className="container"><SectionHeading title="Explore every collection" text="Browse by shape, texture, finish or ease of wear." /><div className="collection-grid">{collections.map((collection) => <Link className="collection-card" to={`/collections/${collection.slug}`} key={collection.slug}><img src={collection.image} alt={`${collection.name} collection`} loading="lazy" width="700" height="760" /><div><p>{collection.description}</p><h2>{collection.name}</h2><span>View collection <ArrowRight size={17} /></span></div></Link>)}</div></div></section>
    </>
  );
}
