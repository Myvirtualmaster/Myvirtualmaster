export const paginate = async (queryBuilder, _ = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;

  const [data, totalItems] = await Promise.all([
    queryBuilder.skip(skip).limit(limit),
    // For countDocuments, use query conditions from queryBuilder if possible
    queryBuilder.model.countDocuments(queryBuilder.getFilter())
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    page,
    totalPages,
    totalItems
  };
};


