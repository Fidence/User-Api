const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'fido1996',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed', err.stack);
  } else {
    console.log('Connected to the PGs database');
  }
  release();
});

module.exports = pool;