import { readdir, mkdir, copyFile, access, constants } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceDir = join(__dirname, 'files');
  const targetDir = join(__dirname, 'files_copy');
  
  try {
    await access(sourceDir, constants.F_OK);
    
    try {
      await access(targetDir, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.message === 'FS operation failed') {
        throw error;
      }
    }
    
    await mkdir(targetDir);
    
    const files = await readdir(sourceDir);
    
    for (const file of files) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);
      await copyFile(sourcePath, targetPath);
    }
    
    console.log('Directory copied successfully');
    
  } catch (error) {
    if (error.code === 'ENOENT' && error.path === sourceDir) {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

await copy();
