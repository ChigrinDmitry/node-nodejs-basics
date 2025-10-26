import { readdir, access, constants } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const dirPath = join(__dirname, 'files');
  
  try {
    await access(dirPath, constants.F_OK);
    
    const files = await readdir(dirPath);
    
    console.log(files);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

await list();
