import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";
import AdminPage from "./components/AdminPage";
import NotFound from "./components/NotFound";
import { StoreProvider } from "./context/StoreContext.jsx";
import "./App.css";

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}

export default App;
