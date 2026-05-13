import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import { useStore } from "../context/StoreContext.jsx";

function Layout() {
  const { storeInfo } = useStore();

  return (
    <div className="app-shell">
      <div className="page-frame">
        <Header
          storeName={storeInfo.name}
          tagline={storeInfo.description}
        />
        <nav className="top-nav" aria-label="main navigation">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Shop
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Admin Portal
          </NavLink>
        </nav>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
