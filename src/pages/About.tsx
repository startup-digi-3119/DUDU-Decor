import { useState, useEffect } from 'react'
import { apiClient } from '../lib/api'
import { Loader2, Quote, Sparkles, Heart, Users as UsersIcon } from 'lucide-react'

export default function About() {
    const [config, setConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)

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

    const about = config?.about_section || {
        title: 'OUR STORY',
        content: 'Founded in 2013, DUDU DECORS began with a simple passion for beautiful spaces and joyful gatherings. What started as a small local service has grown into a premier event management company, known for our attention to detail and creative flair. We believe that every event tells a story, and we are here to help you write yours.',
        image_url: 'https://images.unsplash.com/photo-1519225421980-715cb02152128?q=80&w=2070&auto=format&fit=crop'
    }

    const services = [
        { title: "WEDDING DESIGN", description: "Bespoke decorations and planning for the most romantic day of your life.", icon: Heart },
        { title: "CORPORATE GALAS", description: "Sophisticated branding and event execution for prestigious professional gatherings.", icon: Sparkles },
        { title: "PRIVATE SOIRÉES", description: "Exclusive celebrations curated with intimacy and unparalleled style.", icon: UsersIcon },
    ]

    const team = [
        { name: "Sarah Jenkins", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
        { name: "David Chen", role: "Lead Planner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
        { name: "Emily Rodriguez", role: "Design Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" },
    ]

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-background animate-in fade-in duration-700">
            {/* Header */}
            <section className="relative py-24 bg-secondary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 border border-primary/20 rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 border border-primary/20 rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-primary font-sans text-xs tracking-[0.5em] uppercase mb-4 block">Meet The Atelier</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wider uppercase mb-6">Our Legacy</h1>
                    <div className="h-[1px] w-24 bg-primary mx-auto opacity-50" />
                </div>
            </section>

            {/* Story & Philosophy */}
            <section className="py-32">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 order-2 md:order-1">
                            <div>
                                <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase">{about.title}</span>
                                <h2 className="text-4xl font-serif text-secondary mt-4">The Pursuit of Perfection</h2>
                            </div>

                            <div className="relative">
                                <Quote className="absolute -left-8 -top-8 h-12 w-12 text-primary/10" />
                                <p className="text-lg text-secondary/70 leading-relaxed font-sans font-light italic indent-4">
                                    {about.content}
                                </p>
                            </div>

                            <p className="text-sm text-secondary/60 leading-relaxed font-sans tracking-wide">
                                Every arrangement, every light, and every moment is meticulously thought through. We don't just plan events; we create temporal art that lives forever in the hearts of our clients.
                            </p>

                            <div className="pt-4 border-t border-primary/20 inline-block">
                                <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold italic">Gold Standard Since 2013</p>
                            </div>
                        </div>

                        <div className="relative order-1 md:order-2">
                            <div className="absolute -inset-4 border border-secondary/10 translate-x-4 translate-y-4" />
                            <img
                                src={about.image_url}
                                alt="Our Story"
                                className="relative z-10 w-full h-[600px] object-cover shadow-2xl grayscale"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 bg-secondary text-white relative h-auto">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-20">
                        <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase">The Atelier Approach</span>
                        <h2 className="text-4xl md:text-5xl font-serif mt-4 uppercase tracking-widest">Our Services</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {services.map((service, index) => (
                            <div key={index} className="group p-10 bg-white/5 border border-white/5 hover:border-primary/40 transition-all duration-500 text-center">
                                <div className="inline-block p-4 bg-primary/10 rounded-full mb-8 group-hover:bg-primary/20 transition-colors">
                                    <service.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-serif mb-6 tracking-widest">{service.title}</h3>
                                <p className="text-sm text-gray-400 font-sans font-light leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-24">
                        <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase">The Visionaries</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-secondary mt-4 uppercase tracking-widest">Master Artisans</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {team.map((member, index) => (
                            <div key={index} className="text-center group relative pt-20">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-primary/30 group-hover:bg-primary transition-colors duration-500" />
                                <div className="relative w-64 h-80 mx-auto mb-10 overflow-hidden shadow-2xl">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 border border-primary/20 m-4 group-hover:m-0 transition-all duration-500" />
                                </div>
                                <h3 className="text-2xl font-serif text-secondary tracking-widest uppercase mb-2">{member.name}</h3>
                                <p className="text-[10px] text-primary font-sans tracking-[0.5em] uppercase font-bold">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

