import { Link } from "react-router-dom";

function Header({ storeName, tagline }) {
  return (
    <header className="site-header">
      <Link className="brand-mark" to="/">
        <img src="/cupcake-logo.svg" alt="Goodies Bake Shop logo" />
        <div>
          <p className="eyebrow">Goodies Bake Shop</p>
          <h1>{storeName}</h1>
          <p className="tagline">{tagline}</p>
        </div>
      </Link>
    </header>
  );
}

export default Header;
