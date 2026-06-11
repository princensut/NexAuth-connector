const BASE_URL = import.meta.env.VITE_API_URL

export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            ...options.headers,
        },
    })

    if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        window.location.href = '/login'
        return
    }

    return response.json()
}