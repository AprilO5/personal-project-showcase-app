import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";

function ShopPage() {
  const { products, loading } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return products.filter((product) => {
      const searchableContent =
        `${product.name} ${product.description} ${product.flavor} ${product.price}`.toLowerCase();

      return searchableContent.includes(normalizedSearch);
    });
  }, [products, searchTerm]);

  return (
    <section className="shop-layout">
      <section className="panel sidebar-panel">
        <h2>Shop</h2>
        <SearchBar
          label="Search cupcakes"
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <div className="shop-note">
          <p>Use the search box to filter treats by name, flavor, or price.</p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Fresh menu</p>
            <h2>Bakery items</h2>
          </div>
          <p>{loading ? "Loading..." : `${filteredProducts.length} items found`}</p>
        </div>
        <ProductGrid
          products={filteredProducts}
          emptyMessage="No bakery items match your search."
        />
      </section>
    </section>
  );
}

export default ShopPage;
