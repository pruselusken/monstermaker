const sql = require('mssql');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local (or .env)
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

async function migrate() {
  try {
    console.log('Connecting to:', config.server);
    const pool = await sql.connect(config);
    const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    
    // Remove comments and split by GO statements
    const batches = schema
      .split(/^\s*GO\s*$/im)
      .map(batch => {
        // Remove single-line comments
        return batch
          .split('\n')
          .filter(line => !line.trim().startsWith('--'))
          .join('\n')
          .trim();
      })
      .filter(batch => batch.length > 0);
    
    console.log(`Executing ${batches.length} SQL batches...`);
    
    // Execute each batch separately
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      if (batch) {
        console.log(`\nExecuting batch ${i + 1}/${batches.length}...`);
        console.log(`Preview: ${batch.substring(0, 100)}...`);
        try {
          await pool.request().query(batch);
          console.log(`✓ Batch ${i + 1} completed`);
        } catch (err) {
          console.error(`✗ Batch ${i + 1} failed:`, err.message);
          throw err;
        }
      }
    }
    
    console.log('\n✅ Migration completed successfully');
    await pool.close();
  } catch (err) {
    console.error('\n❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();