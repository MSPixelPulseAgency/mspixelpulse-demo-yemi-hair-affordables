import { createContext, useCallback, useContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => readStorage("yha-currency", "CAD"));
  const [cart, setCart] = useState(() => readStorage("yha-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("yha-wishlist", []));
  const [recentlyViewed, setRecentlyViewed] = useState(() => readStorage("yha-recent", []));
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => localStorage.setItem("yha-currency", JSON.stringify(currency)), [currency]);
  useEffect(() => localStorage.setItem("yha-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("yha-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("yha-recent", JSON.stringify(recentlyViewed)), [recentlyViewed]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const setCurrency = (next) => {
    if (["CAD", "NGN"].includes(next)) setCurrencyState(next);
  };

  const addToCart = useCallback((product, options = {}) => {
    const selected = {
      length: options.length || product.availableLengths[0],
      laceType: options.laceType || product.laceTypes[0],
      density: options.density || product.densityOptions[0],
      capSize: options.capSize || product.capSizes[1],
      colour: options.colour || product.colour
    };
    const key = `${product.id}-${Object.values(selected).join("-")}`;
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + (options.quantity || 1) } : item);
      return [...current, { key, product, selected, quantity: options.quantity || 1 }];
    });
    setToast(`${product.shortName} added to your cart.`);
    setMiniCartOpen(true);
  }, []);

  const removeFromCart = (key) => {
    setCart((current) => current.filter((item) => item.key !== key));
    setToast("Item removed from your cart.");
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return removeFromCart(key);
    setCart((current) => current.map((item) => item.key === key ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);
  const toggleWishlist = (id) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const rememberProduct = (id) => setRecentlyViewed((current) => [id, ...current.filter((item) => item !== id)].slice(0, 6));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * (currency === "NGN" ? item.product.priceNGN : item.product.priceCAD), 0);

  const value = {
    currency, setCurrency, cart, cartCount, cartTotal, addToCart, removeFromCart,
    updateQuantity, clearCart, wishlist, toggleWishlist, recentlyViewed, rememberProduct,
    miniCartOpen, setMiniCartOpen, toast, setToast
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div className={`toast ${toast ? "toast--visible" : ""}`} role="status" aria-live="polite">{toast}</div>
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
};
