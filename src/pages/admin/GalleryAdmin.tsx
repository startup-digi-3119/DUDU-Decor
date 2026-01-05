import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Plus, Trash2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'

export default function GalleryAdmin() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [newProject, setNewProject] = useState({ title: '', category: 'Wedding', description: '' })

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        if (data) setProjects(data)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return

        // 1. Delete image from storage (optional, assumes path Logic)
        // const path = imageUrl.split('/').pop()
        // if (path) await supabase.storage.from('images').remove([path])

        // 2. Delete row
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (!error) fetchProjects()
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage.from('images').getPublicUrl(filePath)

            // Insert into DB
            const { error: dbError } = await supabase.from('projects').insert([{
                title: newProject.title || 'New Project',
                category: newProject.category,
                description: newProject.description,
                image_url: data.publicUrl
            }])

            if (dbError) throw dbError

            alert('Project added!')
            fetchProjects()
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gallery Management</h1>
                <Button disabled={uploading}>
                    <label className="cursor-pointer flex items-center">
                        <Plus className="mr-2 h-4 w-4" /> Add Project (Upload Image)
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                    </label>
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <Input
                    placeholder="Title (set before upload)"
                    value={newProject.title}
                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                />
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newProject.category}
                    onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                >
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Private</option>
                </select>
                <Input
                    placeholder="Description"
                    value={newProject.description}
                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                />
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="relative group">
                            <div className="aspect-square relative">
                                <img src={project.image_url} alt={project.title} className="object-cover w-full h-full rounded-t-lg" />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold">{project.title}</h3>
                                <p className="text-sm text-muted-foreground">{project.category}</p>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
