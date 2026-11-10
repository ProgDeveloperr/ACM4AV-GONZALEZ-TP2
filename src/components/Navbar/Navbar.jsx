import {
  NavLink,
  useNavigate,
} from 'react-router-dom'

import { toast } from 'react-toastify'

import useAuth from '../../hooks/useAuth'

import './Navbar.css'

function Navbar() {
  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    toast.success(
      'Sesión cerrada correctamente'
    )

    navigate('/')
  }

  const getLinkClass = ({
    isActive,
  }) =>
    isActive
      ? 'site-nav__link site-nav__link--active'
      : 'site-nav__link'

  return (
    <header className="site-nav">
      <div className="container site-nav__inner">
       <NavLink
  to="/"
  className="site-nav__brand"
  aria-label="3D Store - Inicio"
>
  <img
    src="/images/brand/3d-store-logo.avif"
    alt=""
    className="site-nav__brand-image"
  />
</NavLink>

        <div className="site-nav__right">
          <nav
            className="site-nav__links"
            aria-label="Navegación principal"
          >
            <NavLink
              to="/"
              end
              className={getLinkClass}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/productos"
              className={getLinkClass}
            >
              Productos
            </NavLink>

            {user?.role === 'admin' && (
              <NavLink
                to="/admin"
                className={getLinkClass}
              >
                Administración
              </NavLink>
            )}
          </nav>

          <div className="site-nav__account">
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="site-nav__login"
              >
                Iniciar sesión
              </NavLink>
            ) : (
              <>
                <div className="site-nav__identity">
                  <span className="site-nav__identity-name">
                    {user.username}
                  </span>

                  <span className="site-nav__identity-role">
                    {user.role === 'admin'
                      ? 'Administrador'
                      : 'Usuario'}
                  </span>
                </div>

                <button
                  type="button"
                  className="site-nav__logout"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar