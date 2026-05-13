function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-thumb">
        <img src="/cupcake-logo.svg" alt="" aria-hidden="true" />
      </div>
      <div className="product-body">
        <p className="card-badge">{product.flavor}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-meta">
          <span>${product.price.toFixed(2)}</span>
          <span>{product.inStock ? "In stock" : "Sold out"}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
