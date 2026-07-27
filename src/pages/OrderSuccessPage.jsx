import { useState } from "react";
import { CheckCircle2, Clipboard, MessageCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { businessConfig, formatMoney } from "../config/business";
import { useStore } from "../context/StoreContext";

export default function OrderSuccessPage() {
  const { setToast } = useStore();
  const [order] = useState(() => {
    try { return JSON.parse(localStorage.getItem("yha-latest-order") || "null"); } catch { return null; }
  });
  const copy = async () => {
    if (!order) return;
    await navigator.clipboard.writeText(order.message);
    setToast("Order summary copied.");
  };
  const whatsappHref = order && businessConfig.whatsappNumber ? `https://wa.me/${businessConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(order.message)}` : "";
  return (
    <>
      <Seo title="Order Summary Ready" description="Your Yemi Hair Affordables order summary is ready to review and share." path="/order-success" />
      <section className="success-page container">
        <div className="success-page__icon"><CheckCircle2 /></div>
        <p className="eyebrow">Summary saved on this device</p>
        <h1>Your order summary is ready.</h1>
        {order ? (
          <>
            <p>Your reference is <strong>{order.reference}</strong>. Copy the summary below and share it through Yemi Hair’s confirmed contact channel.</p>
            <div className="success-card">
              <div><span>Reference</span><strong>{order.reference}</strong></div><div><span>Items subtotal</span><strong>{formatMoney(order.total, order.currency)}</strong></div><div><span>Status</span><strong>Ready to share</strong></div>
              <pre>{order.message}</pre>
              <div className="success-card__actions"><button className="button button--ghost" type="button" onClick={copy}><Clipboard size={18} /> Copy summary</button>{whatsappHref ? <a className="button button--whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Send on WhatsApp</a> : <Link className="button button--ghost" to="/contact"><MessageCircle size={18} /> Contact Rosaline</Link>}</div>
            </div>
            {!businessConfig.whatsappNumber ? <p className="order-notice"><strong>Next step:</strong> Copy this summary and share it through the contact channel provided by Yemi Hair Affordables. Your order is not confirmed until you receive a reply.</p> : null}
          </>
        ) : <p>No recent order summary was found on this device. You can start again from the shop.</p>}
        <div className="success-page__footer"><Link className="button button--primary" to="/shop"><ShoppingBag size={18} /> Continue shopping</Link><Link className="text-link" to="/hair-guide">Read the hair guide</Link></div>
      </section>
    </>
  );
}
