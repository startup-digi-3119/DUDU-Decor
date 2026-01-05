import { useEffect, useState } from 'react'
import { apiClient } from '../../lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { BadgeCheck, Mail, Phone, Calendar } from 'lucide-react'

export default function Messages() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const data = await apiClient('/messages')
            setMessages(data)
        } catch (error) {
            console.error('Failed to fetch messages:', error)
        } finally {
            setLoading(false)
        }
    }

    // Note: Current schema/API doesn't have 'update' endpoint for status.
    // Can implement PATCH in api/messages.ts if needed.
    // For now, removing "Mark as Read" functionality or needs API update.
    // Assuming we just view for now, effectively "Read" when viewed.

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Inquiries & Messages</h1>

            {loading ? <p>Loading...</p> : (
                <div className="space-y-4">
                    {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
                    {messages.map((msg) => (
                        <Card key={msg.id} className={msg.status === 'new' ? 'border-primary' : ''}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    {msg.name}
                                    {msg.status === 'new' && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">New</span>}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" /> {msg.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" /> {msg.phone || 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" /> {msg.event_type || 'General'}
                                    </div>
                                </div>
                                <div className="bg-secondary/50 p-4 rounded-md text-sm">
                                    {msg.message}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
