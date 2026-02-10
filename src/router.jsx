import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { SignIn } from './components/SignIn.jsx'
import { SignUp } from './components/SignUp.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { PublicRoute } from './components/PublicRoute.jsx'


// Another way of routing insead of using <BrowserRouter> in main.jsx, 
// we can create a router and pass it to the RouterProvider component. 
// This way we can define our routes in a separate file and keep our main.jsx clean.
export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
        path: "/signup",
        element: (
            <PublicRoute>
                <SignUp />
            </PublicRoute>
        )
    },
    {
        path: "/signin",
        element: (
            <PublicRoute>
                <SignIn />
            </PublicRoute>
        )
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )
    },
])