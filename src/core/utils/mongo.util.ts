/**
 * Take any object and returns another object with all valid key pairs.
 * @param data
 * @returns {object} object
 */
export const ExtractMongoFilter = (data: object): {} => {
  const entries = Object.entries(data);
  const filter = {};
  for (const entry of entries) {
    const key = entry[0];
    const value = entry[1];

    if (value !== undefined) {
      filter[key] = value;
    }
  }
  return filter;
};
