import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PrivateRoute({ element }) {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className='loading-screen'>
                <div className='spinner'></div>
            </div>
        )
    }

    return isAuthenticated ? element : <Navigate to="/login" />
}

export default PrivateRoute