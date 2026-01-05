import { auth } from './firebase';

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Determine base URL: In dev (Vite), we might need a proxy or full URL.
    // Vercel Serverless functions live at /api.
    // For local dev with `npm run dev` (Vite), we typically proxy /api to the backend, 
    // OR if we run `vercel dev`, it handles it.
    // Assuming relative path '/api' works if served correctly or proxy set up.
    const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    return response.json();
}
