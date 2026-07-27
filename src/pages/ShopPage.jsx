import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import { OrderNotice } from "../components/common";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { useFocusTrap } from "../hooks/useFocusTrap";

const initialFilters = { categories: [], textures: [], lengths: [], featured: false, bestSeller: false, newArrival: false };

function CheckGroup({ title, options, values, onChange }) {
  return (
    <fieldset className="filter-group"><legend>{title}</legend>
      {options.map((option) => <label key={option}><input type="checkbox" checked={values.includes(option)} onChange={() => onChange(values.includes(option) ? values.filter((value) => value !== option) : [...values, option])} /><span>{option}</span></label>)}
    </fieldset>
  );
}

function FilterControls({ filters, setFilters, onReset }) {
  const categories = [...new Set(products.map((product) => product.category))];
  const textures = [...new Set(products.map((product) => product.texture))];
  const lengths = ["8\"", "10\"", "12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\""];
  return (
    <div className="filters">
      <div className="filters__heading"><h2>Filter styles</h2><button className="link-button" type="button" onClick={onReset}><RotateCcw size={15} /> Reset</button></div>
      <CheckGroup title="Category" options={categories} values={filters.categories} onChange={(values) => setFilters({ ...filters, categories: values })} />
      <CheckGroup title="Texture" options={textures} values={filters.textures} onChange={(values) => setFilters({ ...filters, textures: values })} />
      <CheckGroup title="Length" options={lengths} values={filters.lengths} onChange={(values) => setFilters({ ...filters, lengths: values })} />
      <fieldset className="filter-group"><legend>Shop edit</legend>
        {[["featured", "Featured"], ["bestSeller", "Popular picks"], ["newArrival", "New arrivals"]].map(([key, label]) => <label key={key}><input type="checkbox" checked={filters[key]} onChange={() => setFilters({ ...filters, [key]: !filters[key] })} /><span>{label}</span></label>)}
      </fieldset>
      <p className="filter-note">Lace type, cap size and colour can be selected on each product page.</p>
    </div>
  );
}

export default function ShopPage() {
  const { currency } = useStore();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("search") || "");
  const deferredQuery = useDeferredValue(query);
  const [sort, setSort] = useState(params.get("sort") === "best" ? "best" : "featured");
  const [filters, setFilters] = useState(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  useFocusTrap(drawerRef, drawerOpen, closeDrawer);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (query) next.set("search", query); else next.delete("search");
    setParams(next, { replace: true });
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    const normalized = deferredQuery.toLowerCase().trim();
    let result = products.filter((product) => {
      const matchesSearch = !normalized || `${product.name} ${product.category} ${product.texture} ${product.tags.join(" ")} ${product.availableLengths.join(" ")}`.toLowerCase().includes(normalized);
      const matchesCategory = !filters.categories.length || filters.categories.includes(product.category);
      const matchesTexture = !filters.textures.length || filters.textures.includes(product.texture);
      const matchesLength = !filters.lengths.length || filters.lengths.some((length) => product.availableLengths.includes(length));
      return matchesSearch && matchesCategory && matchesTexture && matchesLength
        && (!filters.featured || product.featured) && (!filters.bestSeller || product.bestSeller) && (!filters.newArrival || product.newArrival);
    });
    result = [...result].sort((a, b) => {
      if (sort === "price-low") return (currency === "NGN" ? a.priceNGN - b.priceNGN : a.priceCAD - b.priceCAD);
      if (sort === "price-high") return (currency === "NGN" ? b.priceNGN - a.priceNGN : b.priceCAD - a.priceCAD);
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "new") return Number(b.newArrival) - Number(a.newArrival);
      if (sort === "best") return Number(b.bestSeller) - Number(a.bestSeller);
      return Number(b.featured) - Number(a.featured);
    });
    return result;
  }, [currency, deferredQuery, filters, sort]);

  const reset = () => { setFilters(initialFilters); setQuery(""); setSort("featured"); };
  return (
    <>
      <Seo title="Shop Wigs & Human Hair" description="Browse wigs and human-hair styles in bob, straight, curly, closure, frontal and headband collections with NGN and CAD pricing." path="/shop" />
      <header className="page-hero page-hero--compact"><div className="container"><p className="eyebrow">The full edit</p><h1>Shop hair</h1><p>Find the texture, length and fit that works for your routine.</p></div></header>
      <div className="container shop-toolbar">
        <label className="shop-search"><span className="sr-only">Search shop</span><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search hair, texture or length" /></label>
        <button className="button button--ghost mobile-filter" type="button" onClick={() => setDrawerOpen(true)}><SlidersHorizontal size={18} /> Filters</button>
        <label className="sort-select"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="new">Newest</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="best">Popular picks</option><option value="name">Name: A–Z</option></select></label>
      </div>
      <div className="container shop-layout">
        <aside className="filter-sidebar"><FilterControls filters={filters} setFilters={setFilters} onReset={reset} /></aside>
        <section className="shop-results" aria-labelledby="results-title">
          <div className="results-top"><h2 id="results-title">{filtered.length} {filtered.length === 1 ? "style" : "styles"}</h2><p>Showing prices in {currency} · switch currency in the header</p></div>
          {filtered.length ? <div className="product-grid product-grid--three">{filtered.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="empty-state empty-state--wide"><Search size={40} /><h2>We couldn’t find that style.</h2><p>Try another search or ask Rosaline for a custom option.</p><button className="button button--primary" type="button" onClick={reset}>Reset filters</button></div>}
          <OrderNotice compact />
        </section>
      </div>
      {drawerOpen ? <div className="drawer drawer--left" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeDrawer()}><aside ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="filter-drawer-title"><div className="drawer__top"><h2 id="filter-drawer-title">Filter styles</h2><button className="icon-button" type="button" onClick={closeDrawer} aria-label="Close filters"><X /></button></div><FilterControls filters={filters} setFilters={setFilters} onReset={reset} /><div className="drawer__footer"><button className="button button--primary button--full" type="button" onClick={closeDrawer}>Show {filtered.length} styles</button></div></aside></div> : null}
    </>
  );
}
