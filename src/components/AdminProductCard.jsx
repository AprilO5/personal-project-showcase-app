import MyButton from "./MyButton";

function AdminProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="admin-card">
      <div>
        <p className="card-badge">{product.flavor}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>

      <div className="admin-meta">
        <span>${product.price.toFixed(2)}</span>
        <span>{product.inStock ? "Available" : "Unavailable"}</span>
        <span>{product.featured ? "Featured" : "Standard"}</span>
      </div>

      <div className="admin-actions">
        <MyButton variant="secondary" onClick={() => onEdit(product)}>
          Edit
        </MyButton>
        <MyButton variant="danger" onClick={() => onDelete(product.id)}>
          Delete
        </MyButton>
      </div>
    </article>
  );
}

export default AdminProductCard;
