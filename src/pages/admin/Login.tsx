import { useState } from 'react'
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate login
        setTimeout(() => {
            setLoading(false)
            navigate('/admin/dashboard')
        }, 1000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6 px-8 pb-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold text-primary mb-2">DUDU DECORS</h1>
                        <p className="text-muted-foreground">Admin Portal Login</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" placeholder="admin@dududecors.com" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input type="password" placeholder="••••••••" required />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="text-primary hover:underline">Forgot password?</a>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
