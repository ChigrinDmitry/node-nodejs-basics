import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    }
  });
  
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
  
  reverseTransform.on('error', (error) => {
    console.error('Error in transform:', error.message);
  });
};

await transform();
