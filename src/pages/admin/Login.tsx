import { useState } from 'react'
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"
import { useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/admin/dashboard')
        } catch (err: any) {
            console.error(err)
            setError("Failed to sign in. Please check your email and password.")
            setLoading(false)
        }
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
                        {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@dududecors.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
