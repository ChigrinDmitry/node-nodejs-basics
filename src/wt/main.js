import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numCores = cpus().length;
  
  const results = [];
  
  const workerPromises = [];
  
  for (let i = 0; i < numCores; i++) {
    const workerData = 10 + i;
    
    const workerPromise = new Promise((resolve) => {
      const worker = new Worker(join(__dirname, 'worker.js'), {
        workerData: workerData
      });
      
      worker.on('message', (result) => {
        resolve(result);
      });
      
      worker.on('error', (error) => {
        resolve({ status: 'error', data: null });
      });
      
      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });
    
    workerPromises.push(workerPromise);
  }
  
  const allResults = await Promise.all(workerPromises);
  
  console.log(allResults);
};

await performCalculations();
