import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFile = join(__dirname, 'files', 'archive.gz');
  const outputFile = join(__dirname, 'files', 'fileToCompress.txt');
  
  const inputStream = createReadStream(inputFile);
  
  const outputStream = createWriteStream(outputFile);
  
  const gunzipStream = createGunzip();
  
  inputStream.pipe(gunzipStream).pipe(outputStream);
  
  inputStream.on('error', (error) => {
    console.error('Error reading compressed file:', error.message);
  });
  
  gunzipStream.on('error', (error) => {
    console.error('Error during decompression:', error.message);
  });
  
  outputStream.on('error', (error) => {
    console.error('Error writing output file:', error.message);
  });
  
  outputStream.on('finish', () => {
    console.log('File decompressed successfully');
  });
};

await decompress();
