import ProjectCard from "./ProjectCard";

function ProjectList({ projects, onDeleteProject }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>No bakery items match this search yet.</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDeleteProject={onDeleteProject}
        />
      ))}
    </div>
  );
}

export default ProjectList;
