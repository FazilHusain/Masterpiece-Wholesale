import generateSlug from "./slugify.js";

const generateUniqueSlug = async (Model, name, currentId = null) => {
  const baseSlug = generateSlug(name);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Model.findOne({ slug });

    if (!existing) break;

    if (currentId && existing._id.toString() === currentId.toString()) {
      break;
    }

    counter++;

    slug = `${baseSlug}-${counter}`;
  }

  return slug;
};

export default generateUniqueSlug;