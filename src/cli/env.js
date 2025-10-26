const parseEnv = () => {
  // Get all environment variables
  const envVars = process.env;
  
  // Filter variables with RSS_ prefix
  const rssVars = Object.entries(envVars)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`);
  
  console.log(rssVars.join('; '));
};

parseEnv();
