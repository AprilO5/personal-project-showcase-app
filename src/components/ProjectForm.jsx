import { useState } from "react";

const initialFormState = {
  title: "",
  description: "",
  stack: "",
};

function ProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Controlled inputs keep the current form values in local component state.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  // Form submission sends the new project data to the parent App component.
  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError("Please enter both a menu item name and description.");
      setStatusMessage("");
      return;
    }

    onAddProject(formData);
    setFormData(initialFormState);
    setFormError("");
    setStatusMessage("Menu item added to Goodies Bake Shop.");
  }

  return (
    <section className="panel" aria-labelledby="add-project-heading">
      <h2 id="add-project-heading">Add Menu Item</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Bakery item name"
          />
        </div>

        <div className="field-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the flavor and finish"
          />
        </div>

        <div className="field-group">
          <label htmlFor="stack">Best Pairing</label>
          <input
            id="stack"
            name="stack"
            type="text"
            value={formData.stack}
            onChange={handleChange}
            placeholder="Tea, coffee, berries"
          />
          <p className="field-hint">
            Optional, but helpful for search and the detail page.
          </p>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Add
          </button>
          {formError ? (
            <p className="status-text error-text">{formError}</p>
          ) : (
            statusMessage && <p className="status-text">{statusMessage}</p>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProjectForm;
