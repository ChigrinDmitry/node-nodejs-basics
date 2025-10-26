import { rename as renameFile, access, constants } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const sourceFile = join(__dirname, 'files', 'wrongFilename.txt');
  const targetFile = join(__dirname, 'files', 'properFilename.md');
  
  try {
    await access(sourceFile, constants.F_OK);
    
    try {
      await access(targetFile, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.message === 'FS operation failed') {
        throw error;
      }
    }
    
    await renameFile(sourceFile, targetFile);
    console.log('File renamed successfully');
    
  } catch (error) {
    if (error.code === 'ENOENT' && error.path === sourceFile) {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

await rename();
