import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless'; // Can use 'pg' if cheaper for cold starts, but pooler often needs this
// import { verifyToken } from '../src/lib/server-auth'; // Pending implementation: verify firebase token

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });

    try {
        if (req.method === 'GET') {
            const { rows } = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
            res.status(200).json(rows);
        } else if (req.method === 'POST') {
            // TODO: Verify Auth (req.headers.authorization)
            const { title, category, description, image_url } = req.body;
            const { rows } = await pool.query(
                'INSERT INTO projects (title, category, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
                [title, category, description, image_url]
            );
            res.status(201).json(rows[0]);
        } else if (req.method === 'DELETE') {
            // TODO: Verify Auth
            const { id } = req.query;
            await pool.query('DELETE FROM projects WHERE id = $1', [id]);
            res.status(200).json({ success: true });
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        // await pool.end(); // Serverless pool management handles this, but explicit end is okay for single query logic per req.
    }
}
