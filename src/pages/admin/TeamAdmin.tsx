import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Plus, Trash2 } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'

export default function TeamAdmin() {
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [newMember, setNewMember] = useState({ name: '', role: '', bio: '' })

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        const { data } = await supabase.from('team_members').select('*').order('created_at', { ascending: false })
        if (data) setMembers(data)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return
        const { error } = await supabase.from('team_members').delete().eq('id', id)
        if (!error) fetchMembers()
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
            const filePath = `team/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from('images').getPublicUrl(filePath)

            const { error: dbError } = await supabase.from('team_members').insert([{
                name: newMember.name || 'New Member',
                role: newMember.role || 'Team Member',
                bio: newMember.bio,
                image_url: data.publicUrl
            }])

            if (dbError) throw dbError

            alert('Team member added!')
            fetchMembers()
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Team Management</h1>
                <Button disabled={uploading}>
                    <label className="cursor-pointer flex items-center">
                        <Plus className="mr-2 h-4 w-4" /> Add Member (Upload Photo)
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
                    placeholder="Name"
                    value={newMember.name}
                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                />
                <Input
                    placeholder="Role"
                    value={newMember.role}
                    onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                />
                <Input
                    placeholder="Bio"
                    value={newMember.bio}
                    onChange={e => setNewMember({ ...newMember, bio: e.target.value })}
                />
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <Card key={member.id} className="relative group">
                            <div className="aspect-square relative">
                                <img src={member.image_url} alt={member.name} className="object-cover w-full h-full rounded-t-lg" />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold">{member.name}</h3>
                                <p className="text-sm text-primary font-medium">{member.role}</p>
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleDelete(member.id)}
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
