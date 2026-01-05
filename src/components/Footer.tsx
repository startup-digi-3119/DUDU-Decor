import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="bg-secondary text-white pt-20 pb-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link to="/" className="flex flex-col items-center md:items-start group">
                            <span className="text-2xl font-serif tracking-[0.2em] text-primary group-hover:text-white transition-colors duration-300">
                                DUDU DECORS
                            </span>
                            <span className="text-[0.6rem] font-sans tracking-[0.4em] text-gray-400 mt-[-4px]">
                                LUXURY EVENT PLANNER
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-xs font-sans">
                            Curating extraordinary moments with a touch of gold and an eye for elegance. Your vision, our masterpiece.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-primary font-serif tracking-widest uppercase text-sm mb-6 pb-2 border-b border-primary/20">Navigation</h4>
                        <ul className="space-y-4 text-xs tracking-[0.2em] uppercase font-sans">
                            <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors duration-300">About Our Story</Link></li>
                            <li><Link to="/gallery" className="text-gray-400 hover:text-primary transition-colors duration-300">The Gallery</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors duration-300">Connect With Us</Link></li>
                            <li><Link to="/admin/login" className="text-gray-400 hover:text-primary transition-colors duration-300">Concierge Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-primary font-serif tracking-widest uppercase text-sm mb-6 pb-2 border-b border-primary/20">The Atelier</h4>
                        <ul className="space-y-4 text-xs tracking-widest font-sans text-gray-400">
                            <li className="flex items-center space-x-3 justify-center md:justify-start">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>123 Elite Avenue, Luxury Suite 101</span>
                            </li>
                            <li className="flex items-center space-x-3 justify-center md:justify-start">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3 justify-center md:justify-start">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="lowercase">concierge@dududecors.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-primary font-serif tracking-widest uppercase text-sm mb-6 pb-2 border-b border-primary/20">Social Presence</h4>
                        <div className="flex space-x-6 pt-2">
                            <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[0.6rem] tracking-[0.3em] font-sans text-gray-500 uppercase">
                    <p>&copy; {new Date().getFullYear()} DUDU DECORS. Crafted for excellence.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
