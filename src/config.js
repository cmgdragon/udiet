import dotenv from 'dotenv';

const config = dotenv.config();
console.log(config);

export default config.parsed;