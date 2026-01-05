import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { LayoutDashboard, Image, Users, FileText, MessageSquare, LogOut } from 'lucide-react'
import { cn } from '../lib/utils'
import { useAuth } from '../hooks/useAuth'
import { auth } from '../lib/firebase'

export function AdminLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { session: user, loading } = useAuth()

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Gallery', path: '/admin/gallery', icon: Image },
        { name: 'About', path: '/admin/about', icon: FileText },
        { name: 'Team', path: '/admin/team', icon: Users },
        { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    ]

    const handleLogout = async () => {
        try {
            await auth.signOut()
            navigate('/admin/login')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col fixed inset-y-0 z-50">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-xl font-serif font-bold text-primary">DUDU Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    )
}
