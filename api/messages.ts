import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
        if (req.method === 'POST') {
            const { name, email, phone, event_type, message } = req.body;
            await pool.query(
                'INSERT INTO messages (name, email, phone, event_type, message) VALUES ($1, $2, $3, $4, $5)',
                [name, email, phone, event_type, message]
            );
            res.status(201).json({ success: true });
        } else if (req.method === 'GET') {
            // TODO: Verify Auth
            const { rows } = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
            res.status(200).json(rows);
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
