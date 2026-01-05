import { Card, CardContent } from "../components/ui/Card"

export default function About() {
    const services = [
        { title: "Wedding Planning", description: "From intimate ceremonies to grand celebrations, we handle every detail of your special day." },
        { title: "Corporate Events", description: "Professional planning for conferences, galas, and product launches that impress your clients." },
        { title: "Private Parties", description: "Birthday bashes, anniversaries, and family reunions curated with style and fun." },
    ]

    const team = [
        { name: "Sarah Jenkins", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
        { name: "David Chen", role: "Lead Event Planner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
        { name: "Emily Rodriguez", role: "Decoration Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <section className="bg-secondary py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">About DUDU DECORS</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Crafting experiences, designing memories, and bringing your vision to life.
                    </p>
                </div>
            </section>

            {/* Story & Mission */}
            <section className="py-20">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-primary">Our Story</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Founded in 2015, DUDU DECORS began with a simple passion for beautiful spaces and joyful gatherings.
                            What started as a small local service has grown into a premier event management company, known for
                            our attention to detail and creative flair. We believe that every event tells a story, and we are
                            here to help you write yours.
                        </p>
                        <h2 className="text-3xl font-serif font-bold text-primary pt-4">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To deliver exceptional event experiences through innovative design, meticulous planning, and
                            personalized service, exceeding our clients' expectations every single time.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2070&auto=format&fit=crop"
                            alt="Event planning team"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-center text-primary mb-12">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-center text-primary mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all border-4 border-transparent group-hover:border-primary/20">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
