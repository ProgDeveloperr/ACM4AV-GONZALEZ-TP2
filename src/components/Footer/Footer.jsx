import { Link } from 'react-router-dom'

import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <strong>
            3D Store
          </strong>

          <p>
            Objetos diseñados y fabricados
            mediante impresión 3D.
          </p>
        </div>

        <div className="site-footer__links">
          <Link to="/">
            Inicio
          </Link>

          <Link to="/productos">
            Productos
          </Link>

          <Link to="/login">
            Acceso
          </Link>
        </div>

        <div className="site-footer__meta">
          <span>
            Plataformas de Desarrollo
          </span>

          <span>
            Proyecto académico · 2026
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer