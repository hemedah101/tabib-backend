import { KeyValuePairInput } from '../shared';

/**
 * Returns  object with all valid key pairs.
 * @param data
 * @returns {object} object
 */
export const ExtractMongoFilter = (array: KeyValuePairInput[]): {} => {
  const filter = {};
  for (const pair of array) {
    filter[pair.key] = pair.value;
  }
  return filter;
};
