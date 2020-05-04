import * as path from 'path';

export const ExtractFileNameWithoutExtension = (filePath: string, ext: string) => {
  return path.basename(filePath, ext);
};
