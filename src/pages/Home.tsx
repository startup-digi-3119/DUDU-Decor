import { Button } from "../components/ui/Button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop")' }}
                />

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight animate-fade-in-up">
                        Creating Unforgettable Moments
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                        Premier event management and decoration services for weddings, corporate events, and private parties.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link to="/gallery">
                            <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                                View Our Work
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Welcome to DUDU DECORS</h2>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
                        We specialize in turning your dream events into reality. With years of experience in the industry,
                        our team of dedicated professionals ensures every detail is perfect, from concept to execution.
                        Whether it's a grand wedding or an intimate gathering, we bring creativity and elegance to every occasion.
                    </p>
                    <div className="mt-8">
                        <Link to="/about">
                            <Button variant="link" className="text-primary text-lg font-semibold group">
                                Learn More About Us <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Projects Placeholder */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-primary mb-12">Featured Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-200 shadow-md hover:shadow-xl transition-all">
                                {/* Placeholder for project images */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    Event {i} Image
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <div className="text-white">
                                        <h3 className="text-xl font-bold font-serif">Luxury Wedding</h3>
                                        <p className="text-sm">Decoration & Planning</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/gallery">
                            <Button variant="outline" size="lg">View Full Gallery</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
