import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="panel not-found">
      <h2>Page not found</h2>
      <p>This route does not exist in Goodies Bake Shop.</p>
      <Link className="nav-link active" to="/">
        Return Home
      </Link>
    </section>
  );
}

export default NotFound;
