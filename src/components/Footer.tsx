import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-serif font-bold text-primary">DUDU DECORS</h3>
                        <p className="text-sm text-gray-600">
                            Transforming events into unforgettable memories with luxury decorations and professional planning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/gallery" className="hover:text-primary transition-colors">Our Gallery</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>123 Event Street, City, State</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>hello@dududecors.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} DUDU DECORS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
