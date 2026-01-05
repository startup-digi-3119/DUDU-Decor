import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => setIsOpen(!isOpen)

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex flex-col items-center group">
                            <span className="text-2xl sm:text-3xl font-serif tracking-[0.2em] text-secondary group-hover:text-primary transition-colors duration-300">
                                DUDU DECORS
                            </span>
                            <span className="text-[0.6rem] sm:text-[0.7rem] font-sans tracking-[0.4em] text-primary mt-[-4px]">
                                LUXURY EVENT PLANNER
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={cn(
                                        "relative px-1 py-2 text-sm font-sans font-medium tracking-widest transition-colors duration-300 uppercase group",
                                        location.pathname === link.path
                                            ? "text-primary"
                                            : "text-secondary hover:text-primary"
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute bottom-0 left-0 w-full h-[1px] bg-primary transform origin-left transition-transform duration-300",
                                        location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    )} />
                                </Link>
                            ))}
                            <Button className="bg-secondary hover:bg-primary text-white font-sans tracking-widest text-xs py-2 px-6 rounded-none transition-all duration-300 border border-primary/20">
                                BOOK NOW
                            </Button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Open menu" className="text-secondary hover:text-primary">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2 bg-background border-b border-primary/20 shadow-xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "block px-3 py-4 text-base font-sans font-medium tracking-widest uppercase border-b border-gray-100 last:border-0",
                                    location.pathname === link.path
                                        ? "text-primary bg-accent/50"
                                        : "text-secondary hover:text-primary hover:bg-accent/30"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4">
                            <Button className="w-full bg-secondary hover:bg-primary text-white font-sans tracking-widest text-sm py-4 rounded-none transition-all duration-300 shadow-lg">
                                BOOK NOW
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
