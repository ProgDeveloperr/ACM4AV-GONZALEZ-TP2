import { useState } from 'react'

import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { toast } from 'react-toastify'

import useAuth from '../hooks/useAuth'

import './Auth.css'

function Login() {
  const {
    login,
    isLoggedIn,
  } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [credentials, setCredentials] =
    useState({
      username: '',
      password: '',
    })

  const [error, setError] =
    useState(null)

  if (isLoggedIn) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setCredentials(
      (currentCredentials) => ({
        ...currentCredentials,
        [name]: value,
      })
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setError(null)

    const success = login(
      credentials.username,
      credentials.password
    )

    if (!success) {
      const message =
        'Usuario o contraseña incorrectos.'

      setError(message)
      toast.error(message)

      return
    }

    toast.success(
      'Sesión iniciada correctamente'
    )

    const destination =
      location.state?.from?.pathname ?? '/'

    navigate(
      destination,
      {
        replace: true,
      }
    )
  }

  return (
    <main className="auth-page">
      <div className="container auth-shell">
        <section className="auth-visual">
          <img
            src="/images/products/soporte-celular.avif"
            alt=""
            className="auth-visual__image"
          />

          <div
            className="auth-visual__overlay"
            aria-hidden="true"
          />

          <div className="auth-visual__content">
            <span>
              3D Store
            </span>

            <h2>
              Diseñar.
              <br />
              Fabricar.
              <br />
              Crear.
            </h2>

            <p>
              Gestión del catálogo de productos
              desarrollados mediante impresión 3D.
            </p>
          </div>

          <div className="auth-visual__tag">
            <span>
              Plataforma
            </span>

            <strong>
              Gestión de productos
            </strong>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-card">
            <header className="auth-card__header">
              <span className="auth-card__eyebrow">
                Área privada
              </span>

              <h1>
                Iniciar sesión
              </h1>

              <p>
                Ingresá con una cuenta autorizada
                para acceder a las funciones
                correspondientes a tu rol.
              </p>
            </header>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <label className="form-field">
                <span>
                  Usuario
                </span>

                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Ingresá tu usuario"
                  autoComplete="username"
                  required
                />
              </label>

              <label className="form-field">
                <span>
                  Contraseña
                </span>

                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Ingresá tu contraseña"
                  autoComplete="current-password"
                  required
                />
              </label>

              <button
                type="submit"
                className="button button--dark auth-form__submit"
              >
                Iniciar sesión

                <span aria-hidden="true">
                  →
                </span>
              </button>
            </form>

            <div className="auth-demo">
              <div className="auth-demo__heading">
                <span>
                  Credenciales de demostración
                </span>

                <p>
                  Cuentas disponibles para evaluar
                  roles y permisos.
                </p>
              </div>

              <div className="auth-demo__accounts">
                <div>
                  <span>
                    Administrador
                  </span>

                  <code>
                    admin / 1234
                  </code>
                </div>

                <div>
                  <span>
                    Usuario
                  </span>

                  <code>
                    user / 1234
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login