import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
    const location = useLocation()

    // Hide Navbar/Footer on admin login or dashboard if desired, 
    // but requirements say "Admin Login ... Navigation: Restricted access".
    // Usually layouts differ. For now, let's keep standardized layout for public pages.
    // We can condition it.

    const isAdminRoute = location.pathname.startsWith('/admin')
    /* const isPublicLayout = !isAdminRoute || location.pathname === '/admin/login' */

    // If it's the dashboard, we might want a sidebar layout (Requirement 5: Admin Dashboard Layout).
    // But for now, let's just make a generic Layout that handles public.
    // We can create an `AdminLayout` later.

    if (isAdminRoute && location.pathname !== '/admin/login') {
        return <Outlet /> // Let AdminLayout handle it inside the valid routes
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
