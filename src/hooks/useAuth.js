import { useState, useEffect } from 'react'

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const loggedInUser = localStorage.getItem('loggedInUser')
        if (token && loggedInUser) {
            setIsAuthenticated(true)
            setUser(loggedInUser)
        }
        setLoading(false)
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        setIsAuthenticated(false)
        setUser(null)
    }

    return { isAuthenticated, user, loading, logout }
}