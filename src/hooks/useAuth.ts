import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // Mapping Firebase user to a structure similar to our previous 'session' if needed
    // For simplicity, we just return the user object, but we keep the key 'session' 
    // to minimize refactoring in other components that might check 'session' existence.
    // Ideally, other components should be updated to expect 'user'.
    return { session: user, loading, user }
}
