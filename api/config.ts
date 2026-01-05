import { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import { adminAuth } from '../src/lib/firebase-admin'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method === 'GET') {
        const client = await pool.connect()
        try {
            const result = await client.query('SELECT key, value FROM site_config')
            const config = result.rows.reduce((acc, row) => {
                try {
                    acc[row.key] = JSON.parse(row.value)
                } catch (e) {
                    acc[row.key] = row.value
                }
                return acc
            }, {} as any)
            return res.status(200).json(config)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        } finally {
            client.release()
        }
    }

    if (req.method === 'POST') {
        // Authenticate admin
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const token = authHeader.split('Bearer ')[1]
        try {
            await adminAuth.verifyIdToken(token)
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        const { key, value } = req.body
        if (!key) {
            return res.status(400).json({ error: 'Key is required' })
        }

        const client = await pool.connect()
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
            await client.query(
                'INSERT INTO site_config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
                [key, stringValue]
            )
            return res.status(200).json({ message: 'Config updated' })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        } finally {
            client.release()
        }
    }

    return res.status(405).json({ error: 'Method not allowed' })
}
