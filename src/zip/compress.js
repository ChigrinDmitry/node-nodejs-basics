import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputFile = join(__dirname, 'files', 'fileToCompress.txt');
  const outputFile = join(__dirname, 'files', 'archive.gz');
  
  const inputStream = createReadStream(inputFile);
  
  const outputStream = createWriteStream(outputFile);
  
  const gzipStream = createGzip();
  
  inputStream.pipe(gzipStream).pipe(outputStream);
  
  inputStream.on('error', (error) => {
    console.error('Error reading input file:', error.message);
  });
  
  gzipStream.on('error', (error) => {
    console.error('Error during compression:', error.message);
  });
  
  outputStream.on('error', (error) => {
    console.error('Error writing output file:', error.message);
  });
  
  outputStream.on('finish', () => {
    console.log('File compressed successfully');
  });
};

await compress();
