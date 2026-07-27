import { useCallback, useRef, useState } from "react";
import { Eye, Heart, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { Price, Rating } from "./common";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [quickOpen, setQuickOpen] = useState(false);
  const modalRef = useRef(null);
  const close = useCallback(() => setQuickOpen(false), []);
  useFocusTrap(modalRef, quickOpen, close);
  const badge = product.newArrival ? "New style" : "";

  return (
    <>
      <article className="product-card">
        <div className="product-card__media">
          <Link to={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
            <img src={product.images[0]} alt={`${product.name}, front view`} loading="lazy" width="600" height="760" />
            <img className="product-card__secondary" src={product.images[1]} alt="" loading="lazy" width="600" height="760" />
          </Link>
          {badge ? <span className="badge">{badge}</span> : null}
          <button className={`icon-button product-card__heart ${wishlist.includes(product.id) ? "is-active" : ""}`} type="button" onClick={() => toggleWishlist(product.id)} aria-label={wishlist.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}><Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button>
          <button className="quick-button" type="button" onClick={() => setQuickOpen(true)}><Eye size={17} /> Quick view</button>
        </div>
        <div className="product-card__body">
          <p className="product-card__category">{product.category}</p>
          <h3><Link to={`/shop/${product.slug}`}>{product.name}</Link></h3>
          <Rating rating={product.rating} count={product.reviewCount} />
          <Price product={product} />
          <p className="product-card__lengths">{product.availableLengths.join(" · ")}</p>
          {product.availableLengths.length > 1 ? (
            <Link className="button button--outline button--full" to={`/shop/${product.slug}`}>
              <SlidersHorizontal size={18} /> View options
            </Link>
          ) : (
            <button type="button" className="button button--outline button--full" onClick={() => addToCart(product)}>
              <ShoppingBag size={18} /> Add to cart
            </button>
          )}
        </div>
      </article>
      {quickOpen ? (
        <div className="modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div className="modal__panel quick-view" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby={`quick-${product.id}`}>
            <button className="icon-button modal__close" type="button" onClick={close} aria-label="Close quick view"><X /></button>
            <img src={product.images[0]} alt={product.name} width="600" height="760" />
            <div className="quick-view__content">
              <p className="eyebrow">{product.category}</p>
              <h2 id={`quick-${product.id}`}>{product.name}</h2>
              <Rating rating={product.rating} count={product.reviewCount} />
              <Price product={product} large />
              <p>{product.shortDescription}</p>
              <p><strong>Lengths:</strong> {product.availableLengths.join(", ")}</p>
              <button className="button button--primary button--full" type="button" onClick={() => { addToCart(product); close(); }}><ShoppingBag size={18} /> Add with first options</button>
              <Link className="text-link" to={`/shop/${product.slug}`} onClick={close}>View full product details</Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
