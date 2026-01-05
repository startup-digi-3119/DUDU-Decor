import { useState, useEffect } from 'react'
import { apiClient } from '../../lib/api'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Loader2, Save, Globe, Palette, Layout as LayoutIcon } from 'lucide-react'

export default function WebsiteSettings() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [config, setConfig] = useState<any>({
        hero_settings: {
            title: 'LUXURY WEDDING',
            subtitle: 'Curating the most beautiful events of your life.',
            cta_text: 'EXPLORE OUR WORK',
            cta_link: '/gallery'
        },
        theme_settings: {
            primary_color: '#D4AF37',
            secondary_color: '#0F172A',
            accent_color: '#FDFBF7'
        },
        contact_info: {
            address: '123 Elite Avenue, Luxury Suite 101',
            phone: '+91 98765 43210',
            email: 'concierge@dududecors.com',
            instagram: '#',
            facebook: '#',
            twitter: '#'
        },
        about_section: {
            title: 'OUR STORY',
            content: 'We are masters of elegance, dedicated to turning your dreams into gold.',
            image_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop'
        }
    })

    useEffect(() => {
        fetchConfig()
    }, [])

    const fetchConfig = async () => {
        try {
            const data = await apiClient('/api/config')
            if (Object.keys(data).length > 0) {
                setConfig({ ...config, ...data })
            }
        } catch (error) {
            console.error('Failed to fetch config:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (key: string) => {
        setSaving(true)
        try {
            await apiClient('/api/config', {
                method: 'POST',
                body: JSON.stringify({ key, value: config[key] })
            })
            alert('Settings saved successfully!')
        } catch (error) {
            console.error('Failed to save config:', error)
            alert('Failed to save settings.')
        } finally {
            setSaving(false)
        }
    }

    const updateConfig = (section: string, field: string, value: string) => {
        setConfig({
            ...config,
            [section]: {
                ...config[section],
                [field]: value
            }
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-serif text-secondary tracking-widest uppercase">Website Configuration</h1>
                <p className="text-sm text-muted">Manage the global look and feel of your luxury brand.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hero Section Settings */}
                <Card className="border-primary/10 shadow-lg">
                    <CardHeader className="bg-accent/30 border-b border-primary/5">
                        <CardTitle className="flex items-center space-x-2 font-serif text-lg tracking-widest text-secondary">
                            <LayoutIcon className="h-5 w-5 text-primary" />
                            <span>HERO SECTION</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-sans font-bold tracking-widest text-secondary">MAIN TITLE</label>
                            <input
                                type="text"
                                className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                value={config.hero_settings.title}
                                onChange={(e) => updateConfig('hero_settings', 'title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-sans font-bold tracking-widest text-secondary">SUBTITLE</label>
                            <textarea
                                className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none h-24"
                                value={config.hero_settings.subtitle}
                                onChange={(e) => updateConfig('hero_settings', 'subtitle', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-sans font-bold tracking-widest text-secondary">CTA TEXT</label>
                                <input
                                    type="text"
                                    className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                    value={config.hero_settings.cta_text}
                                    onChange={(e) => updateConfig('hero_settings', 'cta_text', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-sans font-bold tracking-widest text-secondary">CTA LINK</label>
                                <input
                                    type="text"
                                    className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                    value={config.hero_settings.cta_link}
                                    onChange={(e) => updateConfig('hero_settings', 'cta_link', e.target.value)}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => handleSave('hero_settings')}
                            disabled={saving}
                            className="w-full bg-secondary hover:bg-primary text-white font-sans tracking-[0.2em] rounded-none py-6 h-auto"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            PUBLISH CHANGES
                        </Button>
                    </CardContent>
                </Card>

                {/* Contact Info Settings */}
                <Card className="border-primary/10 shadow-lg">
                    <CardHeader className="bg-accent/30 border-b border-primary/5">
                        <CardTitle className="flex items-center space-x-2 font-serif text-lg tracking-widest text-secondary">
                            <Globe className="h-5 w-5 text-primary" />
                            <span>CONTACT & SOCIAL</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-sans font-bold tracking-widest text-secondary">PHONE NUMBER</label>
                            <input
                                type="text"
                                className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                value={config.contact_info.phone}
                                onChange={(e) => updateConfig('contact_info', 'phone', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-sans font-bold tracking-widest text-secondary">EMAIL ATELIER</label>
                            <input
                                type="email"
                                className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                value={config.contact_info.email}
                                onChange={(e) => updateConfig('contact_info', 'email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-sans font-bold tracking-widest text-secondary">OFFICE ADDRESS</label>
                            <input
                                type="text"
                                className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                value={config.contact_info.address}
                                onChange={(e) => updateConfig('contact_info', 'address', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-sans font-bold tracking-widest text-secondary">INSTAGRAM URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                    value={config.contact_info.instagram}
                                    onChange={(e) => updateConfig('contact_info', 'instagram', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-sans font-bold tracking-widest text-secondary">FACEBOOK URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-accent/20 border border-primary/10 rounded-none p-3 font-sans text-sm focus:ring-1 focus:ring-primary outline-none"
                                    value={config.contact_info.facebook}
                                    onChange={(e) => updateConfig('contact_info', 'facebook', e.target.value)}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => handleSave('contact_info')}
                            disabled={saving}
                            className="w-full bg-secondary hover:bg-primary text-white font-sans tracking-[0.2em] rounded-none py-6 h-auto"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            PUBLISH CHANGES
                        </Button>
                    </CardContent>
                </Card>

                {/* Theme Settings (Advanced) */}
                <Card className="border-primary/10 shadow-lg">
                    <CardHeader className="bg-accent/30 border-b border-primary/5">
                        <CardTitle className="flex items-center space-x-2 font-serif text-lg tracking-widest text-secondary">
                            <Palette className="h-5 w-5 text-primary" />
                            <span>BRAND IDENTITY</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <p className="text-xs text-muted font-sans italic">Customizing these will update the global color scheme of your Atelier.</p>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-sans font-bold tracking-widest text-secondary uppercase block">Primary Gold</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-full border-none cursor-pointer"
                                        value={config.theme_settings.primary_color}
                                        onChange={(e) => updateConfig('theme_settings', 'primary_color', e.target.value)}
                                    />
                                    <span className="text-[10px] font-mono">{config.theme_settings.primary_color}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-sans font-bold tracking-widest text-secondary uppercase block">Deep Navy</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-full border-none cursor-pointer"
                                        value={config.theme_settings.secondary_color}
                                        onChange={(e) => updateConfig('theme_settings', 'secondary_color', e.target.value)}
                                    />
                                    <span className="text-[10px] font-mono">{config.theme_settings.secondary_color}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-sans font-bold tracking-widest text-secondary uppercase block">Soft Cream</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-full border-none cursor-pointer"
                                        value={config.theme_settings.accent_color}
                                        onChange={(e) => updateConfig('theme_settings', 'accent_color', e.target.value)}
                                    />
                                    <span className="text-[10px] font-mono">{config.theme_settings.accent_color}</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleSave('theme_settings')}
                            disabled={saving}
                            className="w-full bg-secondary hover:bg-primary text-white font-sans tracking-[0.2em] rounded-none py-6 h-auto mt-4"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            PUBLISH BRAND COLORS
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
