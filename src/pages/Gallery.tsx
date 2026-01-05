import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { X } from 'lucide-react'

// Mock Data
const projects = [
    { id: 1, title: 'Grand Royal Wedding', category: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', description: 'A magnificent royal-themed wedding with gold and velvet accents.' },
    { id: 2, title: 'Tech Summit Gala', category: 'Corporate', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop', description: 'Annual tech conference networking dinner with modern lighting.' },
    { id: 3, title: 'Garden Birthday Bash', category: 'Private', image: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=2070&auto=format&fit=crop', description: 'Intimate outdoor birthday celebration with floral arrangements.' },
    { id: 4, title: 'Beachside Union', category: 'Wedding', image: 'https://images.unsplash.com/photo-1544979590-37e9b47cd705?q=80&w=1887&auto=format&fit=crop', description: 'Romantic sunset wedding by the ocean.' },
    { id: 5, title: 'Product Launch 2024', category: 'Corporate', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop', description: 'Futuristic product reveal event setup.' },
    { id: 6, title: 'Golden Anniversary', category: 'Private', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop', description: 'Celebrating 50 years with elegance and style.' },
]

const categories = ['All', 'Wedding', 'Corporate', 'Private']

export default function Gallery() {
    const [filter, setFilter] = useState('All')
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Our Gallery</h1>
                <p className="text-muted-foreground">Explore our portfolio of curated events and breathtaking designs.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant={filter === cat ? 'default' : 'outline'}
                        onClick={() => setFilter(cat)}
                        className="rounded-full px-6"
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="group cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white font-serif font-bold text-lg">View Project</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                            <p className="text-sm text-muted-foreground uppercase tracking-wide">{project.category}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white rounded-full"
                            onClick={() => setSelectedProject(null)}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="h-64 md:h-auto">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-8">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                                    {selectedProject.category}
                                </span>
                                <h2 className="text-3xl font-serif font-bold mb-4">{selectedProject.title}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {selectedProject.description}
                                </p>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Client Recommendation</span>
                                        <span className="text-muted-foreground">⭐⭐⭐⭐⭐</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Event Date</span>
                                        <span className="text-muted-foreground">Oct 2023</span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Button className="w-full" onClick={() => setSelectedProject(null)}>
                                        Close Gallery View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
