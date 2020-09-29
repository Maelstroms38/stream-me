import { config } from 'dotenv';
const result = config();

// Only override process.env if .env file is present and valid
if (!result.error) {
  const parsed = result.parsed;
  if (parsed) {
    Object.keys(parsed).forEach((key) => {
      const value = parsed[key];
      if (value) {
        process.env[key] = value;
        console.log(`${key}=${value}`);
      }
    });
  }
}
