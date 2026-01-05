import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { BadgeCheck, Mail, Phone, Calendar } from 'lucide-react'

export default function Messages() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
        if (data) setMessages(data)
        setLoading(false)
    }

    const markAsRead = async (id: string) => {
        await supabase.from('messages').update({ status: 'read' }).eq('id', id)
        fetchMessages()
    }

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
                                {msg.status === 'new' && (
                                    <button
                                        onClick={() => markAsRead(msg.id)}
                                        className="mt-4 text-sm text-primary hover:underline flex items-center gap-1"
                                    >
                                        <BadgeCheck className="h-4 w-4" /> Mark as Read
                                    </button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
