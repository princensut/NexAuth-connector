import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils'

function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        handleSuccess('Logged out successfully')
        setTimeout(() => navigate('/login'), 1000)
    }

    return (
        <div className='home-wrapper'>
            <div className='home-navbar'>
                <div className='home-brand'>MyApp</div>
                <div className='home-user'>
                    <div className='home-avatar'>
                        {user ? user.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className='home-username'>{user}</span>
                    <button className='logout-btn' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='home-content'>
                <h1>Welcome, {user} 👋</h1>
                <p>Your dashboard is ready.</p>
            </div>
        </div>
    )
}

export default Dashboard