# JWT Connector
auth wiring made dead simple

Full JWT authentication dropped into any React project in under a minute. One hook. One wrapper. Nothing else.

Most auth setups take hours — token storage, protected routes, API headers, redirect logic, loading states. jwt-connector replaces all of it with three files and a single component wrapper.

```bash
# clone and install
git clone https://github.com/YOURUSERNAME/jwt-connector.git
cd jwt-connector
npm install
```

---

## The entire setup — 60 seconds, no kidding

```js
// Step 1 — wrap your protected route (5 seconds)
<Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />

// Step 2 — use auth state anywhere (5 seconds)
const { user, logout } = useAuth()

// Step 3 — make authenticated API calls (5 seconds)
const data = await apiFetch('/api/products')

// Done. Your app now has:
// ✅ Login + Signup pages (built — no UI to write)
// ✅ JWT stored and read from localStorage
// ✅ Protected routes — unauthenticated users redirected to /login
// ✅ Auto logout on 401 (expired or invalid token)
// ✅ Auth token attached to every API request automatically
```

That's it. You didn't write a token decoder, a redirect guard, a loading state, or a single line of header logic.

---

## Before & After

### Before — doing auth yourself

```jsx
// Every. Single. Route.
function Dashboard() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const loggedInUser = localStorage.getItem('loggedInUser')
        if (!token || !loggedInUser) {
            navigate('/login')
            return
        }
        setUser(loggedInUser)
    }, [])

    const res = await fetch('/api/data', {
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
```

15 lines of repeated boilerplate. On every protected page. One mistake and users get stuck or tokens leak.

### After — with jwt-connector

```jsx
function Dashboard() {
    const { user } = useAuth()
    const data = await apiFetch('/api/products')
}
```

Same security. 2 lines. Once.

---

## You also don't need to build login UI

Login and Signup pages are already built and styled. Just plug in your backend URL — users land on a clean card UI, log in, and get redirected to your app with a token. jwt-connector picks it up automatically.

```
User visits /dashboard (not logged in)
       │
       ▼
PrivateRoute redirects → /login   ← already built for you
       │
       ▼  user logs in
navigate('/dashboard')
       │
       ▼  useAuth reads token from localStorage
Dashboard loads ✅  token attached to all API calls ✅
```

Your backend URL is always just:

```
VITE_API_URL=https://your-backend.vercel.app
```

No login page HTML. No form handling. No token logic. Nothing.

---

## Quickstart — the full picture

### 1. Clone and install

```bash
git clone https://github.com/YOURUSERNAME/jwt-connector.git
cd jwt-connector
npm install
```

### 2. Configure — one line

```bash
# .env
VITE_API_URL=https://your-backend.vercel.app
```

Works in any environment — local, staging, production — with no code changes.

### 3. Protect your routes

```jsx
// App.jsx
<Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
```

### 4. Use in any page

```jsx
import { useAuth } from '../hooks/useAuth'
import { apiFetch } from '../api/api'

// One import. Everything you need.
```

---

## Three files. That's the whole connector.

| File | What it does |
|---|---|
| `src/hooks/useAuth.js` | reads token, exposes `isAuthenticated`, `user`, `logout` |
| `src/components/PrivateRoute.jsx` | blocks unauthenticated access, shows loader |
| `src/api/api.js` | wraps fetch — auto attaches JWT, auto logs out on 401 |

---

## Hooks & Utilities

### `useAuth()`
For reading auth state. Use on any page or component.

```jsx
const { isAuthenticated, user, loading, logout } = useAuth()
```

### `apiFetch(endpoint, options)`
For all authenticated API calls. Token is attached automatically.

```js
// GET
const data = await apiFetch('/api/products')

// POST
const result = await apiFetch('/api/create', {
    method: 'POST',
    body: JSON.stringify({ name: 'item' })
})
```

### `PrivateRoute`
Redirects to `/login` if not authenticated. Shows a loading spinner while checking.

```jsx
<Route path='/settings' element={<PrivateRoute element={<Settings />} />} />
```

---

## How JWT auth works here

```
1. User submits login form
2. Backend validates → returns jwtToken + name
3. Token + name saved to localStorage
4. useAuth reads them on every page load
5. PrivateRoute checks isAuthenticated before rendering
6. apiFetch pulls token from localStorage on every request
7. On 401 response → token cleared → user sent to /login
```

---

## Project Structure

```
jwt-connector/
├── src/
│   ├── api/
│   │   └── api.js               ← apiFetch — auto attaches JWT
│   ├── components/
│   │   └── PrivateRoute.jsx     ← blocks unauthenticated access
│   ├── hooks/
│   │   └── useAuth.js           ← isAuthenticated, user, logout
│   ├── pages/
│   │   ├── Login.jsx            ← built and styled
│   │   ├── Signup.jsx           ← built and styled
│   │   └── Dashboard.jsx        ← example protected page
│   ├── utils.js                 ← toast helpers
│   ├── App.jsx                  ← routes wired up
│   └── main.jsx                 ← vite entry point
├── .env                         ← VITE_API_URL
└── vite.config.js
```

---

## Backend Endpoints Expected

| Method | Endpoint | Body | Returns |
|---|---|---|---|
| POST | `/auth/signup` | `{ name, email, password }` | `{ success, message }` |
| POST | `/auth/login` | `{ email, password }` | `{ success, jwtToken, name }` |

Any Express + JWT backend works. The backend for this project is live at `https://mongodb-vrzy.vercel.app`.

---

## Dropping this into your own project

Copy just three files:

```
src/api/api.js
src/hooks/useAuth.js
src/components/PrivateRoute.jsx
```

Update `VITE_API_URL` in your `.env` and wrap your routes:

```jsx
<Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
```

Done.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| HTTP | Fetch API |
| Notifications | React Toastify |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel |

---

## Deployment

```bash
npm run build
vercel --prod
```

Add `VITE_API_URL` under **Vercel → Settings → Environment Variables**.

---

## Links

- Frontend live → [jwt-connector.vercel.app](https://jwt-connector.vercel.app)
- Backend repo → [github.com/YOURUSERNAME/mongodb-auth-backend](https://github.com/YOURUSERNAME/mongodb-auth-backend)
- Issues → open an issue on GitHub

---

## Author

**Your Name**
- GitHub: [@YOURUSERNAME](https://github.com/YOURUSERNAME)
- LinkedIn: [linkedin.com/in/YOURPROFILE](https://linkedin.com/in/YOURPROFILE)

---

## License

MIT — free to use in personal and commercial projects.
