import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { AboutPage, ContactPage, FAQPage, HairGuidePage, NotFoundPage, PolicyPage } from "./pages/ContentPages";

const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const CustomOrderPage = lazy(() => import("./pages/CustomOrderPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
  }, [location.pathname]);
  return null;
}

function LoadingPage() {
  return <div className="page-loader" role="status"><span></span><p>Preparing the next look…</p></div>;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:slug" element={<ProductPage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="collections/:slug" element={<CollectionsPage />} />
            <Route path="custom-order" element={<CustomOrderPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-success" element={<OrderSuccessPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="hair-guide" element={<HairGuidePage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PolicyPage type="privacy" />} />
            <Route path="terms" element={<PolicyPage type="terms" />} />
            <Route path="shipping-returns" element={<PolicyPage type="shipping-returns" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
