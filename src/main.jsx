import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <p className='auth-title'>Supabase CRUD app with Auth</p>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
