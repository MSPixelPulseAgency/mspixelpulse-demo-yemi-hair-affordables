import { useEffect, useState } from "react";
import { CheckCircle2, Clipboard, MessageCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { businessConfig, formatMoney } from "../config/business";
import { useStore } from "../context/StoreContext";

export default function OrderSuccessPage() {
  const { setToast } = useStore();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    try { setOrder(JSON.parse(localStorage.getItem("yha-latest-order") || "null")); } catch { setOrder(null); }
  }, []);
  const copy = async () => {
    if (!order) return;
    await navigator.clipboard.writeText(order.message);
    setToast("Order summary copied.");
  };
  const whatsappHref = order && businessConfig.whatsappNumber ? `https://wa.me/${businessConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(order.message)}` : "";
  return (
    <>
      <Seo title="Order Request Received" description="Your Yemi Hair Affordables demo order request has been created." path="/order-success" />
      <section className="success-page container">
        <div className="success-page__icon"><CheckCircle2 /></div>
        <p className="eyebrow">Request saved on this device</p>
        <h1>Thank you—your look is one step closer.</h1>
        {order ? (
          <>
            <p>Your demo reference is <strong>{order.reference}</strong>. Keep it with your order summary when contacting the business.</p>
            <div className="success-card">
              <div><span>Reference</span><strong>{order.reference}</strong></div><div><span>Demo total</span><strong>{formatMoney(order.total, order.currency)}</strong></div><div><span>Status</span><strong>Awaiting confirmation</strong></div>
              <pre>{order.message}</pre>
              <div className="success-card__actions"><button className="button button--ghost" type="button" onClick={copy}><Clipboard size={18} /> Copy summary</button>{whatsappHref ? <a className="button button--whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Send on WhatsApp</a> : <Link className="button button--ghost" to="/contact"><MessageCircle size={18} /> Contact Rosaline</Link>}</div>
            </div>
            {!businessConfig.whatsappNumber ? <p className="demo-notice"><strong>WhatsApp not live yet:</strong> Add the confirmed business number to the environment settings to enable one-tap handoff.</p> : null}
          </>
        ) : <p>No recent demo request was found on this device. You can start again from the shop.</p>}
        <div className="success-page__footer"><Link className="button button--primary" to="/shop"><ShoppingBag size={18} /> Continue shopping</Link><Link className="text-link" to="/hair-guide">Read the hair guide</Link></div>
      </section>
    </>
  );
}
