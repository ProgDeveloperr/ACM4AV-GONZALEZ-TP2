import { Link } from 'react-router-dom'

import './Auth.css'

function AccessDenied() {
  return (
    <main className="auth-system-page">
      <div className="container">
        <section className="access-state">
          <div
            className="access-state__code"
            aria-hidden="true"
          >
            403
          </div>

          <div className="access-state__content">
            <span className="access-state__eyebrow">
              Acceso restringido
            </span>

            <h1>
              No tenés permisos
              <br />
              para ingresar.
            </h1>

            <p>
              Esta sección está disponible
              únicamente para usuarios con
              permisos de administrador.
            </p>

            <Link
              to="/productos"
              className="button button--dark"
            >
              Volver al catálogo

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AccessDenied