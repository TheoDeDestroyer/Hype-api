const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/hype';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE users(tenant_id SERIAL PRIMARY KEY, first_name VARCHAR(40) not null, last_name VARCHAR(40), age integer not null, email  VARCHAR(60) not null )');
query.on('end', () => { client.end(); });