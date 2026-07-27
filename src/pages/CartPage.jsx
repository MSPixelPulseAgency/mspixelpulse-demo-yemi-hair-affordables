import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { OrderNotice, Quantity } from "../components/common";
import { formatMoney } from "../config/business";
import { useStore } from "../context/StoreContext";

export default function CartPage() {
  const { cart, currency, cartTotal, updateQuantity, removeFromCart } = useStore();
  return (
    <>
      <Seo title="Shopping Cart" description="Review selected Yemi Hair Affordables products and variations before creating an order summary." path="/cart" />
      <header className="page-hero page-hero--compact"><div className="container"><p className="eyebrow">Your selections</p><h1>Shopping cart</h1><p>Review each detail before you continue.</p></div></header>
      <section className="section section--tight">
        <div className="container">
          {!cart.length ? (
            <div className="empty-state empty-state--wide"><ShoppingBag size={44} /><h2>Your next favourite look is waiting.</h2><p>Explore the edit, choose your options and come back when you are ready.</p><Link className="button button--primary" to="/shop">Continue shopping <ArrowRight size={18} /></Link></div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {cart.map((item) => {
                  const unit = currency === "NGN" ? item.product.priceNGN : item.product.priceCAD;
                  return (
                    <article className="cart-item" key={item.key}>
                      <Link to={`/shop/${item.product.slug}`}><img src={item.product.images[0]} alt={item.product.name} width="180" height="225" /></Link>
                      <div className="cart-item__details"><p>{item.product.category}</p><h2><Link to={`/shop/${item.product.slug}`}>{item.product.name}</Link></h2><dl><div><dt>Length</dt><dd>{item.selected.length}</dd></div><div><dt>Lace</dt><dd>{item.selected.laceType}</dd></div><div><dt>Density</dt><dd>{item.selected.density}</dd></div><div><dt>Cap</dt><dd>{item.selected.capSize}</dd></div></dl><div className="cart-item__bottom"><Quantity value={item.quantity} onChange={(value) => updateQuantity(item.key, value)} /><button className="link-button link-button--danger" type="button" onClick={() => removeFromCart(item.key)}><Trash2 size={16} /> Remove</button></div></div>
                      <strong className="cart-item__price">{formatMoney(unit * item.quantity, currency)}</strong>
                    </article>
                  );
                })}
              </div>
              <aside className="order-card">
                <h2>Order summary</h2>
                <div><span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span><strong>{formatMoney(cartTotal, currency)}</strong></div>
                <div><span>Delivery</span><strong>Confirmed with order</strong></div>
                <label>Delivery or order note<textarea rows="3" placeholder="Optional note for Roseline"></textarea></label>
                <div className="order-card__total"><span>Items subtotal</span><strong>{formatMoney(cartTotal, currency)}</strong></div>
                <p>Final pricing, payment and delivery details will be confirmed before fulfilment.</p>
                <Link className="button button--primary button--full" to="/checkout">Continue to checkout <ArrowRight size={18} /></Link>
                <Link className="button button--ghost button--full" to="/shop">Continue shopping</Link>
              </aside>
            </div>
          )}
          <OrderNotice compact />
        </div>
      </section>
    </>
  );
}
