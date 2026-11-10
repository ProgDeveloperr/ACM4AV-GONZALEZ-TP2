import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import {
  ToastContainer,
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import Login from './pages/Login'
import AccessDenied from './pages/AccessDenied'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/productos"
            element={<Products />}
          />

          <Route
            path="/productos/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/acceso-denegado"
            element={<AccessDenied />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={['admin']}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  )
}

export default App