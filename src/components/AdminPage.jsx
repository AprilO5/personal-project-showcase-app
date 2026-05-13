import { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import ProductForm from "./ProductForm";
import AdminProductCard from "./AdminProductCard";

function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, loading, error } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function handleSaveProduct(productData) {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, productData);
      setSelectedProduct(null);
      return;
    }

    await addProduct(productData);
  }

  function handleEditStart(product) {
    setSelectedProduct(product);
  }

  function handleCancelEdit() {
    setSelectedProduct(null);
  }

  return (
    <section className="admin-layout">
      <ProductForm
        key={selectedProduct?.id ?? "new-product"}
        product={selectedProduct}
        onSave={handleSaveProduct}
        onCancel={handleCancelEdit}
      />

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Admin tools</p>
            <h2>Manage products</h2>
          </div>
          <p>{loading ? "Loading..." : `${products.length} total items`}</p>
        </div>

        {error ? <p className="status-text error-text">{error}</p> : null}

        <div className="admin-grid">
          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onEdit={handleEditStart}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default AdminPage;
