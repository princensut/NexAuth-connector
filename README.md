# React + Vite
JWT Connector — React Authentication Boilerplate

A plug-and-play JWT authentication system built with React + Vite. Handles login, signup, protected routing, and authenticated API calls out of the box — designed to be dropped into any React project as a reusable auth layer.


Live Demo


https://nexauth-connector.vercel.app




Features


JWT-based authentication with localStorage persistence
Protected routes — unauthenticated users are redirected to login
Tab-switched Login / Signup UI on a single card
Centralized API helper that automatically attaches auth tokens
Auto logout on 401 (expired or invalid token)
Toast notifications for success and error feedback
Fully responsive — works on mobile and desktop
Clean, minimal UI with purple accent theme



Tech Stack

LayerTechnologyFrameworkReact 18Build ToolViteRoutingReact Router v6HTTPFetch APINotificationsReact ToastifyAuthJWT (JSON Web Tokens)BackendNode.js + Express + MongoDB AtlasDeploymentVercel


Project Structure

jwt-connector/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js               # apiFetch helper — auto attaches JWT
│   ├── components/
│   │   └── PrivateRoute.jsx     # blocks unauthenticated access
│   ├── hooks/
│   │   └── useAuth.js           # auth state — isAuthenticated, user, logout
│   ├── pages/
│   │   ├── Login.jsx            # login form
│   │   ├── Signup.jsx           # signup form
│   │   └── Dashboard.jsx        # protected page
│   ├── styles/
│   │   └── Dashboard.css
│   ├── utils.js                 # toast helpers
│   ├── App.jsx                  # route definitions
│   ├── App.css                  # auth page styles
│   ├── index.css                # global reset + centering
│   └── main.jsx                 # vite entry point
├── .env                         # VITE_API_URL
├── vite.config.js
└── package.json


Getting Started

Prerequisites


Node.js 18+
npm


Installation

bash# Clone the repo
git clone https://github.com/yourusername/jwt-connector.git
cd jwt-connector

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=https://mongodb-vrzy.vercel.app" > .env

# Start dev server
npm run dev

App runs at http://localhost:5173


Environment Variables

Create a .env file in the root:

VITE_API_URL=https://your-backend-url.vercel.app


Never commit .env to git — it's already in .gitignore




API Endpoints Used

MethodEndpointBodyDescriptionPOST/auth/signup{ name, email, password }Register new userPOST/auth/login{ email, password }Login, returns JWT


How Authentication Works

1. User submits login form
2. Backend validates credentials → returns jwtToken + name
3. Token saved to localStorage
4. useAuth hook reads token on every page load
5. PrivateRoute checks isAuthenticated before rendering protected pages
6. apiFetch attaches token to every API request header
7. On 401 response → token cleared → user redirected to /login


Connecting to Your Own Project

This is built as a connector — copy these three files into any React project:

src/api/api.js
src/hooks/useAuth.js
src/components/PrivateRoute.jsx

Wrap protected routes with <PrivateRoute> and use apiFetch for all authenticated API calls:

jsx// Protect a route
<Route path='/profile' element={<PrivateRoute element={<Profile />} />} />

// Make an authenticated API call
const data = await apiFetch('/api/products')


Deployment

bash# Build for production
npm run build

# Deploy to Vercel
vercel --prod

Make sure to add VITE_API_URL in your Vercel project environment variables under Settings → Environment Variables.


Backend Repository

The authentication backend (Express + MongoDB + JWT):


https://github.com/princensut/mongodb




Author

PRINCE KUMAR


GitHub: @princensut
LinkedIn: linkedin.com/in/prince-kumar-nsut
Email: princekumar1821006@email.com



License

MIT — free to use in personal and commercial projects.
