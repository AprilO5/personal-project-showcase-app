import { Link, useParams } from "react-router-dom";

function ProjectDetail({ projects }) {
  const { projectSlug } = useParams();
  const project = projects.find((entry) => entry.slug === projectSlug);

  if (!project) {
    return (
      <section className="detail-layout">
        <div className="detail-panel">
          <h2>Bakery item not found</h2>
          <p>
            This route does not match a current menu item. Head back to the
            bakery menu to keep browsing.
          </p>
          <Link className="secondary-button" to="/">
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="detail-layout">
      <Link className="back-link" to="/">
        ← Back to the menu
      </Link>

      <article className="detail-panel">
        <span className="detail-kicker">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <div className="detail-grid">
          <div>
            <h3>Best Pairing</h3>
            <p>{project.stack}</p>
          </div>
          <div>
            <h3>Price</h3>
            <p>{project.year}</p>
          </div>
          <div>
            <h3>Texture</h3>
            <p>{project.challenge}</p>
          </div>
          <div>
            <h3>Bakery Note</h3>
            <p>{project.solution}</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ProjectDetail;
