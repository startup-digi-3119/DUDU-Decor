import { useState, useEffect } from 'react'
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Mail, Phone, MapPin, Clock, Loader2, Send } from "lucide-react"
import { apiClient } from "../lib/api"

export default function Contact() {
    const [config, setConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        fetchConfig()
    }, [])

    const fetchConfig = async () => {
        try {
            const data = await apiClient('/api/config')
            setConfig(data)
        } catch (error) {
            console.error('Failed to fetch config:', error)
        } finally {
            setLoading(false)
        }
    }

    const contact = config?.contact_info || {
        address: '123 Elite Avenue, Luxury Suite 101',
        phone: '+91 98765 43210',
        email: 'concierge@dududecors.com'
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const messageData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            event_type: formData.get('type') as string,
            message: formData.get('message') as string,
        }

        try {
            await apiClient('/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            })
            alert("Thank you for your message! Our concierge will contact you shortly.")
            form.reset()
        } catch (error) {
            console.error(error)
            alert('Error sending message. Please try again.')
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-background min-h-screen animate-in fade-in duration-700">
            {/* Header */}
            <section className="relative py-32 bg-secondary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20 filter grayscale" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop")' }} />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-primary font-sans text-xs tracking-[0.5em] uppercase mb-4 block underline underline-offset-8 decoration-primary/30">Connect</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase">The Atelier</h1>
                </div>
            </section>

            <div className="container mx-auto px-4 py-24 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Information */}
                    <div className="space-y-16">
                        <div>
                            <span className="text-primary font-sans text-[10px] font-bold tracking-[0.4em] uppercase">Inquiries</span>
                            <h2 className="text-4xl font-serif text-secondary mt-4 uppercase tracking-wider">Reach Out</h2>
                            <p className="text-secondary/60 mt-8 font-sans font-light leading-relaxed max-w-md italic">
                                "Every grand celebration begins with a whisper. We invite you to share your vision with us, and let us transform it into an unforgettable reality."
                            </p>
                        </div>

                        <div className="grid gap-12 text-secondary">
                            <div className="flex items-start space-x-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary mt-1">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-secondary/40">Direct Dial</h3>
                                    <p className="font-serif text-xl tracking-widest">{contact.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary mt-1">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-secondary/40">Electronic Mail</h3>
                                    <p className="font-serif text-xl tracking-widest lowercase">{contact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary mt-1">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-secondary/40">The Atelier</h3>
                                    <p className="font-serif text-xl tracking-widest">{contact.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary mt-1">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-secondary/40">Consultation Hours</h3>
                                    <p className="font-sans text-xs tracking-widest uppercase">Mon - Sat: 10:00 AM - 07:00 PM</p>
                                    <p className="text-[9px] text-primary tracking-widest uppercase font-bold">Strictly by Appointment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="relative group">
                        <div className="absolute -inset-4 border border-primary/20 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-0" />
                        <Card className="relative z-10 border-none shadow-2xl rounded-none bg-white p-10 md:p-16">
                            <CardContent className="p-0">
                                <h2 className="text-3xl font-serif text-secondary mb-10 tracking-widest uppercase text-center md:text-left">Consultation Request</h2>
                                <form onSubmit={handleSubmit} className="space-y-8 uppercase">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-[10px] font-sans font-bold tracking-widest text-secondary/40">Full Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                className="w-full bg-accent/20 border-b border-secondary/10 px-0 py-3 font-serif tracking-widest focus:border-primary outline-none transition-colors"
                                                placeholder="Name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-[10px] font-sans font-bold tracking-widest text-secondary/40">Email Address</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="w-full bg-accent/20 border-b border-secondary/10 px-0 py-3 font-serif tracking-widest focus:border-primary outline-none transition-colors lowercase"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-[10px] font-sans font-bold tracking-widest text-secondary/40">Phone Number</label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                className="w-full bg-accent/20 border-b border-secondary/10 px-0 py-3 font-serif tracking-widest focus:border-primary outline-none transition-colors"
                                                placeholder="Phone"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="type" className="text-[10px] font-sans font-bold tracking-widest text-secondary/40">Event Category</label>
                                            <select
                                                id="type"
                                                name="type"
                                                className="w-full bg-accent/20 border-b border-secondary/10 px-0 py-3 font-serif tracking-widest focus:border-primary outline-none appearance-none transition-colors cursor-pointer"
                                            >
                                                <option>Wedding</option>
                                                <option>Corporate Gala</option>
                                                <option>Private Soirée</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-[10px] font-sans font-bold tracking-widest text-secondary/40">Vision Details</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="w-full bg-accent/20 border-b border-secondary/10 px-0 py-3 font-serif tracking-widest focus:border-primary outline-none min-h-[120px] transition-colors resize-none"
                                            placeholder="Tell us about your dream event..."
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full bg-secondary hover:bg-primary text-white rounded-none tracking-[0.4em] font-sans text-xs py-6 h-auto shadow-xl group transition-all"
                                    >
                                        {sending ? (
                                            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                INQUIRE NOW <Send className="ml-2 h-3 w-3 group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

