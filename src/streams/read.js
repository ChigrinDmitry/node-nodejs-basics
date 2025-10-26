import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');
  
  const fileStream = createReadStream(filePath);
  
  fileStream.pipe(process.stdout);
  
  fileStream.on('error', (error) => {
    console.error('Error reading file:', error.message);
  });
};

await read();
