import { writeFile, access, constants } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';
  
  try {
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }

    try {
      await writeFile(filePath, content, 'utf8');
      console.log('File created successfully');
    } catch (writeError) {
      throw new Error('FS operation failed');
    }
  }
};

await create();
