import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');
  
  const fileStream = createWriteStream(filePath);
  
  process.stdin.pipe(fileStream);
  
  fileStream.on('error', (error) => {
    console.error('Error writing file:', error.message);
  });
  
  process.stdin.on('end', () => {
    console.log('Data written to file successfully');
  });
};

await write();
