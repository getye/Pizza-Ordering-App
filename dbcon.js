const Pool = require("pg").Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // This will now use the value from Vercel
    ssl: {
      rejectUnauthorized: false // Required for most hosted databases
    }
  });

module.exports = pool;