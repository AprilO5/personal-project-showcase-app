import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

const storeInfo = {
  id: 1,
  name: "Goodies Bake Shop",
  description: "Sweet cupcakes and bakery treats for every celebration.",
  location: "12 Frosting Lane",
  phone: "(555) 321-7788",
  hours: "Mon-Sat 8am-6pm",
};

const cupcakes = [
  {
    id: 1,
    name: "Pink Velvet Cupcake",
    description: "A soft vanilla cupcake with blush buttercream.",
    flavor: "Vanilla berry",
    price: 4.5,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Pink Sugar Cookie",
    description: "A soft pink sugar cookie with a buttery center.",
    flavor: "Pink sugar",
    price: 3.75,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Cherry Sprinkle Cupcake",
    description: "Sweet cherry cake topped with bright sprinkles.",
    flavor: "Cherry",
    price: 5,
    inStock: false,
    featured: false,
  },
];

function createJsonResponse(data) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

function mockFetch() {
  let products = [...cupcakes];

  global.fetch = vi.fn((url, options = {}) => {
    const method = options.method ?? "GET";

    if (url.endsWith("/store_info/1")) {
      return createJsonResponse(storeInfo);
    }

    if (url.endsWith("/cupcakes") && method === "GET") {
      return createJsonResponse(products);
    }

    if (url.endsWith("/cupcakes") && method === "POST") {
      const newProduct = {
        id: 99,
        ...JSON.parse(options.body),
      };
      products = [...products, newProduct];
      return createJsonResponse(newProduct);
    }

    if (url.endsWith("/cupcakes/1") && method === "PATCH") {
      const updates = JSON.parse(options.body);
      const updatedProduct = { ...products[0], ...updates };
      products = [updatedProduct, ...products.slice(1)];
      return createJsonResponse(updatedProduct);
    }

    if (url.endsWith("/cupcakes/1") && method === "DELETE") {
      products = products.filter((product) => product.id !== 1);
      return createJsonResponse({});
    }

    return createJsonResponse([]);
  });
}

function renderApp(initialEntries = ["/"]) {
  mockFetch();

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe("Goodies Bake Shop", () => {
  it("renders the home page with store information", async () => {
    renderApp();

    expect(
      await screen.findByRole("heading", { name: "Goodies Bake Shop" }),
    ).toBeInTheDocument();
    expect(screen.getByText("12 Frosting Lane")).toBeInTheDocument();
    expect(screen.getByText("Pink Velvet Cupcake")).toBeInTheDocument();
  });

  it("shows products on the shop page and filters by search", async () => {
    const user = userEvent.setup();
    renderApp(["/shop"]);

    expect(await screen.findByText("Pink Sugar Cookie")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search cupcakes"), "cherry");

    expect(screen.getByText("Cherry Sprinkle Cupcake")).toBeInTheDocument();
    expect(screen.queryByText("Pink Velvet Cupcake")).not.toBeInTheDocument();
  });

  it("creates a new product from the admin portal", async () => {
    const user = userEvent.setup();
    renderApp(["/admin"]);

    await screen.findByRole("heading", { name: "Add bakery item" });

    await user.type(screen.getByLabelText("Product Name"), "Cloud Nine Cupcake");
    await user.type(screen.getByLabelText("Description"), "A soft cupcake with pale pink frosting.");
    await user.type(screen.getByLabelText("Flavor"), "Strawberry cream");
    await user.type(screen.getByLabelText("Price"), "6.25");
    await user.click(screen.getByRole("button", { name: "Add Product" }));

    expect(await screen.findByText("Cloud Nine Cupcake")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/cupcakes",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("updates an existing product from the admin portal", async () => {
    const user = userEvent.setup();
    renderApp(["/admin"]);

    expect(await screen.findByText("Pink Velvet Cupcake")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    const priceInput = screen.getByLabelText("Price");
    await user.clear(priceInput);
    await user.type(priceInput, "7.00");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/cupcakes/1",
        expect.objectContaining({ method: "PATCH" }),
      );
    });

    expect(screen.getByText("$7.00")).toBeInTheDocument();
  });

  it("deletes a product from the admin portal", async () => {
    const user = userEvent.setup();
    renderApp(["/admin"]);

    expect(await screen.findByText("Pink Velvet Cupcake")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Delete" })[0]);

    await waitFor(() => {
      expect(screen.queryByText("Pink Velvet Cupcake")).not.toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/cupcakes/1",
      expect.objectContaining({ method: "DELETE" }),
    );
  });
});
