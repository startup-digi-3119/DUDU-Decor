import { useState, useEffect } from 'react'
import { Button } from "../components/ui/Button"
import { Link } from "react-router-dom"
import { Star, Sparkles, Loader2 } from "lucide-react"
import { apiClient } from '../lib/api'

export default function Home() {
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

    const hero = config?.hero_settings || {
        title: 'LUXURY WEDDINGS',
        subtitle: 'Curating the most beautiful events of your life with a touch of gold and timeless elegance.',
        cta_text: 'EXPLORE OUR WORK',
        cta_link: '/gallery'
    }

    const about = config?.about_section || {
        title: 'OUR STORY',
        content: 'We are masters of elegance, dedicated to turning your dreams into gold. With over a decade of experience in the luxury event industry, we bring unparalleled sophistication to every celebration.',
        image_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-background animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-secondary/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom z-0"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop")' }}
                />

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="h-[1px] w-12 sm:w-20 bg-primary opacity-60" />
                        <span className="text-primary font-sans text-xs sm:text-sm tracking-[0.5em] uppercase">Est. 2013</span>
                        <div className="h-[1px] w-12 sm:w-20 bg-primary opacity-60" />
                    </div>

                    <h1 className="text-5xl md:text-8xl font-serif text-white tracking-wider mb-8 drop-shadow-2xl">
                        {hero.title}
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 font-sans tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed italic">
                        {hero.subtitle}
                    </p>

                    <Link to={hero.cta_link}>
                        <Button className="bg-primary hover:bg-primary/90 text-white font-sans tracking-[0.3em] text-xs py-5 px-10 rounded-none transform transition-all hover:scale-105 shadow-2xl border border-white/10">
                            {hero.cta_text}
                        </Button>
                    </Link>

                    <div className="absolute bottom-12 flex flex-col items-center animate-bounce opacity-40">
                        <span className="text-[10px] text-white tracking-[0.3em] uppercase mb-2">Scroll</span>
                        <div className="h-12 w-[1px] bg-white opacity-40" />
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-32 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-primary/10 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-primary/10 translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 border border-primary/20 translate-x-8 translate-y-8 z-0" />
                            <img
                                src={about.image_url}
                                alt="Luxury Atelier"
                                className="relative z-10 w-full h-[600px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-10 -right-10 bg-secondary p-12 z-20 shadow-2xl hidden md:block">
                                <span className="text-primary text-5xl font-serif">10+</span>
                                <p className="text-white text-[10px] tracking-[0.4em] uppercase mt-2">Years of Excellence</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div>
                                <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase">{about.title}</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-secondary mt-4 leading-tight">
                                    Crafting Bespoke <br /> Experiences
                                </h2>
                            </div>

                            <p className="text-lg text-secondary/70 leading-relaxed font-sans font-light italic">
                                "{about.content}"
                            </p>

                            <div className="grid grid-cols-2 gap-8 text-secondary">
                                <div className="space-y-2">
                                    <Star className="h-5 w-5 text-primary" />
                                    <h4 className="font-serif text-lg">Award Winning</h4>
                                    <p className="text-xs text-secondary/60 font-sans tracking-widest uppercase">Planning Services</p>
                                </div>
                                <div className="space-y-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    <h4 className="font-serif text-lg">Gold Standard</h4>
                                    <p className="text-xs text-secondary/60 font-sans tracking-widest uppercase">Decoration Quality</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link to="/about">
                                    <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white rounded-none tracking-widest text-xs px-8 py-4">
                                        READ THE FULL STORY
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Services/Gallery Teaser */}
            <section className="py-32 bg-secondary text-white relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-xl">
                            <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase">Our Expertise</span>
                            <h2 className="text-4xl md:text-6xl font-serif mt-4">The Art of Celebration</h2>
                        </div>
                        <Link to="/gallery" className="group">
                            <span className="text-xs tracking-[0.3em] font-sans border-b border-primary/40 pb-2 group-hover:text-primary transition-colors">EXPLORE THE ARCHIVE</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: 'Weddings', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Corporate', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop' },
                            { name: 'Galas', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop' }
                        ].map((service, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                                    <img
                                        src={service.img}
                                        alt={service.name}
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <h3 className="text-2xl font-serif tracking-widest uppercase group-hover:text-primary transition-colors text-center">{service.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

