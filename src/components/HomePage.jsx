import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ProductGrid from "./ProductGrid";
import MyButton from "./MyButton";

function HomePage() {
  const { storeInfo, products, loading } = useStore();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

  return (
    <section className="home-layout">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="hero-tag">Cupcakes, cookies, and sweet little treats</p>
          <h2>Simple cupcake shop storefront with a matching admin portal.</h2>
          <p>
            Browse the collection, search the shop, and manage bakery items from
            the admin page with full create, update, and delete actions.
          </p>
          <div className="hero-actions">
            <Link to="/shop">
              <MyButton>Browse Shop</MyButton>
            </Link>
            <Link to="/admin">
              <MyButton variant="secondary">Open Admin</MyButton>
            </Link>
          </div>
        </div>

        <aside className="info-card">
          <h3>Visit Us</h3>
          <p>{storeInfo.location}</p>
          <p>{storeInfo.phone}</p>
          <p>{storeInfo.hours}</p>
        </aside>
      </div>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Featured menu</p>
            <h2>Customer favorites</h2>
          </div>
          <p>{loading ? "Loading treats..." : `${featuredProducts.length} featured items`}</p>
        </div>
        <ProductGrid products={featuredProducts} emptyMessage="No featured items are available yet." />
      </section>
    </section>
  );
}

export default HomePage;
