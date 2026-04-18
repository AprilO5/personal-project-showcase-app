function createId(title) {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
}

export function createUniqueSlug(title, projects) {
  const baseSlug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const existingSlugs = new Set(projects.map((project) => project.slug));

  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let candidateSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.has(candidateSlug)) {
    counter += 1;
    candidateSlug = `${baseSlug}-${counter}`;
  }

  return candidateSlug;
}

export function buildProject({ title, description, stack, slug }) {
  return {
    id: createId(title),
    slug,
    title: title.trim(),
    description: description.trim(),
    stack: stack.trim() || "Hot chocolate, tea",
    category: "Fresh Addition",
    year: "$7",
    challenge:
      "Soft, fresh-baked, and ready for the front counter.",
    solution:
      "Added through a controlled React form and rendered instantly through updated parent state.",
  };
}
