import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  
  const fileStream = createReadStream(filePath);
  
  const hash = createHash('sha256');
  
  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });
  
  fileStream.on('end', () => {
    const hexHash = hash.digest('hex');
    console.log(hexHash);
  });
  
  fileStream.on('error', (error) => {
    console.error('Error reading file:', error.message);
  });
};

await calculateHash();
