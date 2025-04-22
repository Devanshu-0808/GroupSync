import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './pages/login.jsx'
import GroupSyncDashboard from './pages/DashBoard.jsx'
import RoomManagement from './pages/Join.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <GroupSyncDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  }, 
  {
    path: '/create',
    element: (
      <PrivateRoute>
        <RoomManagement />
      </PrivateRoute>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
