import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://neondb_owner:npg_4VewBCzjrO7f@ep-old-glitter-ahxc2u7j-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Applying schema...');

        // Split by semicolon to run statements individually if needed, 
        // but client.query usually handles multiple statements if nicely formatted.
        // However, for safety/clarity, simple exec is often fine with valid SQL.
        await client.query(schemaSql);

        console.log('Schema applied successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
