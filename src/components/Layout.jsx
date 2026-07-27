import { useCallback, useRef, useState } from "react";
import { Facebook, Heart, Instagram, Menu, MessageCircle, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { businessConfig, formatMoney } from "../config/business";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { Quantity } from "./common";

const nav = [
  ["Home", "/"], ["Shop", "/shop"], ["Collections", "/collections"], ["Custom Order", "/custom-order"],
  ["Hair Guide", "/hair-guide"], ["About", "/about"], ["Contact", "/contact"]
];

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Yemi Hair Affordables home">
      <span>Yemi Hair</span><small>Affordables</small>
    </Link>
  );
}

function CurrencySwitcher({ compact = false }) {
  const { currency, setCurrency } = useStore();
  return (
    <label className={`currency ${compact ? "currency--compact" : ""}`}>
      <span className="sr-only">Display currency</span>
      <select value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Display currency">
        <option value="CAD">CAD — $</option>
        <option value="NGN">NGN — ₦</option>
      </select>
    </label>
  );
}

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;
  const results = query.trim().length > 1 ? products.filter((product) => `${product.name} ${product.category} ${product.texture} ${product.availableLengths.join(" ")}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : [];
  return (
    <div className="search-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={ref} className="search-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div className="search-overlay__top"><h2 id="search-title">Find your next look</h2><button className="icon-button" type="button" onClick={onClose} aria-label="Close search"><X /></button></div>
        <label className="search-field"><Search size={20} /><span className="sr-only">Search products</span><input autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by style, texture or length…" /></label>
        {query.length > 1 && !results.length ? <p className="empty-inline">We couldn’t find that style. Try another search or ask Rosaline for a custom option.</p> : null}
        <div className="search-results">
          {results.map((product) => (
            <Link to={`/shop/${product.slug}`} key={product.id} onClick={onClose}>
              <img src={product.images[0]} alt="" width="64" height="80" />
              <span><strong>{product.name}</strong><small>{product.texture} · {product.availableLengths.join(", ")}</small></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;
  return (
    <div className="drawer drawer--left" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside ref={ref} role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
        <div className="drawer__top"><Brand /><button className="icon-button" type="button" onClick={onClose} aria-label="Close menu"><X /></button></div>
        <h2 className="sr-only" id="mobile-menu-title">Site menu</h2>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([label, path]) => <NavLink key={path} to={path} onClick={onClose}>{label}</NavLink>)}
        </nav>
        <div className="drawer__footer"><CurrencySwitcher /><p>{businessConfig.locationNote}</p></div>
      </aside>
    </div>
  );
}

function MiniCart() {
  const { cart, currency, cartTotal, miniCartOpen, setMiniCartOpen, updateQuantity, removeFromCart } = useStore();
  const ref = useRef(null);
  const close = useCallback(() => setMiniCartOpen(false), [setMiniCartOpen]);
  useFocusTrap(ref, miniCartOpen, close);
  if (!miniCartOpen) return null;
  return (
    <div className="drawer drawer--right" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <aside ref={ref} role="dialog" aria-modal="true" aria-labelledby="mini-cart-title">
        <div className="drawer__top"><h2 id="mini-cart-title">Your cart</h2><button className="icon-button" type="button" onClick={close} aria-label="Close cart"><X /></button></div>
        {!cart.length ? (
          <div className="empty-state"><ShoppingBag size={38} /><h3>Your next favourite look is waiting.</h3><Link className="button button--primary" to="/shop" onClick={close}>Explore the shop</Link></div>
        ) : (
          <>
            <div className="mini-cart__items">
              {cart.map((item) => (
                <div className="mini-cart__item" key={item.key}>
                  <img src={item.product.images[0]} alt="" width="88" height="110" />
                  <div><h3>{item.product.shortName}</h3><small>{item.selected.length} · {item.selected.laceType}</small><strong>{formatMoney((currency === "NGN" ? item.product.priceNGN : item.product.priceCAD) * item.quantity, currency)}</strong><div className="mini-cart__actions"><Quantity value={item.quantity} onChange={(value) => updateQuantity(item.key, value)} /><button className="link-button" type="button" onClick={() => removeFromCart(item.key)}>Remove</button></div></div>
                </div>
              ))}
            </div>
            <div className="mini-cart__summary"><div><span>Subtotal</span><strong>{formatMoney(cartTotal, currency)}</strong></div><p>Delivery and payment details are confirmed before fulfilment.</p><Link className="button button--primary button--full" to="/checkout" onClick={close}>Review and checkout</Link><Link className="button button--ghost button--full" to="/cart" onClick={close}>View cart</Link></div>
          </>
        )}
      </aside>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, setMiniCartOpen, wishlist } = useStore();
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="announcement"><p>Beautiful hair. Fair prices. <span>Canada and Nigeria orders welcome.</span></p></div>
      <header className="site-header">
        <div className="site-header__inner container">
          <button className="icon-button mobile-only" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.slice(0, 5).map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <CurrencySwitcher compact />
            <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Search products"><Search /></button>
            <Link className="icon-button desktop-icon" to="/about" aria-label="Account information placeholder"><UserRound /></Link>
            <Link className="icon-button desktop-icon" to="/shop" aria-label={`${wishlist.length} wishlist items`}><Heart /></Link>
            <button className="icon-button cart-button" type="button" onClick={() => setMiniCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}><ShoppingBag /><span>{cartCount}</span></button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MiniCart />
    </>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Brand /><p>Beautiful hair selected with care by Rosaline. Premium feeling, fair pricing and personal guidance.</p><div className="socials"><a href={businessConfig.instagram} aria-label="Instagram placeholder"><Instagram /></a><a href={businessConfig.facebook} aria-label="Facebook placeholder"><Facebook /></a><a href="#" aria-label="WhatsApp placeholder"><MessageCircle /></a></div></div>
        <div><h2>Shop</h2><Link to="/shop">All hair</Link><Link to="/collections/bob-wigs">Bob wigs</Link><Link to="/collections/curly-hair">Curly hair</Link><Link to="/collections/straight-hair">Straight hair</Link><Link to="/custom-order">Custom order</Link></div>
        <div><h2>Customer care</h2><Link to="/hair-guide">Hair guide</Link><Link to="/faq">FAQs</Link><Link to="/contact">Contact</Link><Link to="/shipping-returns">Shipping & returns</Link><Link to="/cart">Cart</Link></div>
        <div><h2>Policies</h2><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><p>{businessConfig.email}<br />{businessConfig.phone}</p><p>CAD and NGN prices are stored separately. Final details are confirmed before fulfilment.</p></div>
      </div>
      <div className="container footer-bottom"><p>© {year} Yemi Hair Affordables. Demo website by MSPixelPulse.</p><p>Visa · Mastercard · Interac · Bank transfer <span>(integration-ready placeholders)</span></p></div>
    </footer>
  );
}

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <main id="main-content" key={location.pathname}><Outlet /></main>
      <Footer />
    </>
  );
}
