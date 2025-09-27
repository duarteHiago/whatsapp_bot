const pool = require('../database'); // seu pool de conexão já existente

async function findOrCreateContact(number) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM contacts WHERE number = $1', [number]);
    
    if (res.rows.length > 0) {
      await client.query('UPDATE contacts SET last_contact = NOW() WHERE number = $1', [number]);
      return res.rows[0];
    } else {
      const insert = await client.query(
        'INSERT INTO contacts (number) VALUES ($1) RETURNING *',
        [number]
      );
      return insert.rows[0];
    }
  } finally {
    client.release();
  }
}

module.exports = { findOrCreateContact };

