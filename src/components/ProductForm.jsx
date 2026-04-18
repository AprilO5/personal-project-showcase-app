import { useId, useState } from "react";
import MyButton from "./MyButton";

function ProductForm({ product, onSave, onCancel }) {
  const nameId = useId();
  const descriptionId = useId();
  const flavorId = useId();
  const priceId = useId();

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    flavor: product?.flavor ?? "",
    price: product?.price?.toString() ?? "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextProduct = {
      ...formData,
      price: Number(formData.price),
    };

    await onSave(nextProduct);
    setStatusMessage(product ? "Product updated." : "Product added.");

    if (!product) {
      setFormData({
        name: "",
        description: "",
        flavor: "",
        price: "",
        inStock: true,
        featured: false,
      });
    }
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Admin portal</p>
          <h2>{product ? "Edit bakery item" : "Add bakery item"}</h2>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor={nameId}>Product Name</label>
          <input
            id={nameId}
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Chocolate swirl cupcake"
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor={descriptionId}>Description</label>
          <textarea
            id={descriptionId}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Soft cake with vanilla frosting"
            required
          />
        </div>

        <div className="form-row">
          <div className="field-group">
            <label htmlFor={flavorId}>Flavor</label>
            <input
              id={flavorId}
              name="flavor"
              type="text"
              value={formData.flavor}
              onChange={handleChange}
              placeholder="Vanilla bean"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor={priceId}>Price</label>
            <input
              id={priceId}
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="4.50"
              required
            />
          </div>
        </div>

        <div className="checkbox-row">
          <label>
            <input
              name="inStock"
              type="checkbox"
              checked={formData.inStock}
              onChange={handleChange}
            />
            In stock
          </label>
          <label>
            <input
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured item
          </label>
        </div>

        <div className="form-actions">
          <MyButton type="submit">{product ? "Save Changes" : "Add Product"}</MyButton>
          {product ? (
            <MyButton type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </MyButton>
          ) : null}
          {statusMessage ? <p className="status-text">{statusMessage}</p> : null}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
