import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://neondb_owner:npg_4VewBCzjrO7f@ep-old-glitter-ahxc2u7j-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function probe() {
    try {
        await client.connect();
        const res = await client.query("SELECT schema_name FROM information_schema.schemata;");
        console.log('Schemas:', res.rows.map(r => r.schema_name).join(', '));

        const ext = await client.query("SELECT * FROM pg_extension;");
        console.log('Extensions:', ext.rows.map(r => r.extname).join(', '));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

probe();
