function ProjectSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="field-group">
      <label htmlFor="project-search">Search Menu</label>
      <input
        id="project-search"
        className="search-input"
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search Menu"
      />
    </div>
  );
}

export default ProjectSearch;
