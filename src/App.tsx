
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AdminLayout } from './components/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import GalleryAdmin from './pages/admin/GalleryAdmin'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin/login" element={<Login />} />
        </Route>

        import GalleryAdmin from './pages/admin/GalleryAdmin'

        // ... existing imports

        {/* ... existing code ... */}
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          import TeamAdmin from './pages/admin/TeamAdmin'
          import Messages from './pages/admin/Messages'

          // ...

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="about" element={<div>About Admin (Coming Soon)</div>} />
            <Route path="team" element={<TeamAdmin />} />
            <Route path="messages" element={<Messages />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App
