import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:4000";

const emptyStoreInfo = {
  name: "Goodies Bake Shop",
  description: "Cupcakes and sweet treats made fresh each day.",
  location: "12 Frosting Lane",
  phone: "(555) 123-4567",
  hours: "Mon-Sat 8am-6pm",
};

function useBakeShopData() {
  const [storeInfo, setStoreInfo] = useState(emptyStoreInfo);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [storeResponse, productsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/store_info/1`),
          fetch(`${API_BASE_URL}/cupcakes`),
        ]);

        const [storeData, productsData] = await Promise.all([
          storeResponse.json(),
          productsResponse.json(),
        ]);

        setStoreInfo(storeData);
        setProducts(productsData);
      } catch (fetchError) {
        setError("Unable to load bakery data right now.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function addProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/cupcakes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const savedProduct = await response.json();
    setProducts((currentProducts) => [...currentProducts, savedProduct]);
  }

  // PATCH keeps the update payload small while still refreshing the changed card.
  async function updateProduct(productId, updates) {
    const response = await fetch(`${API_BASE_URL}/cupcakes/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    const updatedProduct = await response.json();
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? updatedProduct : product,
      ),
    );
  }

  async function deleteProduct(productId) {
    await fetch(`${API_BASE_URL}/cupcakes/${productId}`, {
      method: "DELETE",
    });

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  }

  return {
    storeInfo,
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}

export default useBakeShopData;
