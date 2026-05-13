# Personal Project Showcase App

This project is a simple React and Vite bakery storefront called Goodies Bake Shop with an admin portal. The project follows the summative lab requirements by using client-side routing, standard hooks, a custom hook, a simulated backend with `db.json`, and CRUD actions for bakery products.

## Features

- Three client-side routes:
  - `Home`
  - `Shop`
  - `Admin Portal`
- Simple cupcake brand image with a light blue and light pink theme
- Product data loaded from a simulated backend with `json-server`
- Full CRUD flow:
  - `GET` bakery items and store information
  - `POST` new bakery items
  - `PATCH` existing bakery items
  - `DELETE` bakery items
- React hooks:
  - `useState`
  - `useEffect`
  - `useContext`
  - `useId`
- Custom hook:
  - `useBakeShopData`
- Reusable JSX components including a `MyButton` component inspired by the React docs examples
- Tests with Vitest and React Testing Library

## Setup

1. Open the project folder:

```bash
cd /Users/april/Documents/New\ project/portfolio-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start the simulated backend:

```bash
npm run server
```

4. In a second terminal, start the React app:

```bash
npm run dev
```

5. Run tests:

```bash
npm test
```

6. Create a production build:

```bash
npm run build
```

## Usage

- Visit `Home` to see the bakery brand section and featured cupcakes.
- Visit `Shop` to search bakery items by name, flavor, or price.
- Visit `Admin Portal` to add, edit, and delete products.

## Component Structure

```text
App
├── StoreProvider
├── Layout
│   ├── Header
│   ├── Navigation
│   └── Routes
│       ├── HomePage
│       │   └── ProductGrid
│       ├── ShopPage
│       │   ├── SearchBar
│       │   └── ProductGrid
│       └── AdminPage
│           ├── ProductForm
│           └── AdminProductCard
```

## Hooks And Props

- `useBakeShopData` is the custom hook that handles data fetching and CRUD logic.
- `StoreProvider` uses context so route pages can share store and product data.
- `ProductForm` uses `useId` to keep form labels connected to inputs.
- Props are passed to reusable components such as `Header`, `MyButton`, `ProductGrid`, `ProductCard`, and `AdminProductCard`.

## Testing

The test suite covers:

- Home page rendering
- Shop search behavior
- Admin create flow
- Admin update flow
- Admin delete flow

## Known Limitations

- The app depends on `json-server`, so the backend must be running locally for live CRUD outside tests.
- The admin form focuses on simple product management instead of advanced validation.
