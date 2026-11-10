import { Link } from 'react-router-dom'

import './Home.css'

function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <span className="home-hero__eyebrow">
              Diseño · Fabricación · Impresión 3D
            </span>

            <h1>
              Ideas digitales.
              <br />
              Objetos reales.
            </h1>

            <p>
              Diseñamos y fabricamos objetos
              funcionales, decorativos y
              personalizables mediante impresión
              3D.
            </p>

            <div className="home-hero__actions">
              <Link
                to="/productos"
                className="home-hero__primary"
              >
                Explorar catálogo

                <span aria-hidden="true">
                  ↗
                </span>
              </Link>

              <a
                href="#proceso"
                className="home-hero__secondary"
              >
                Cómo trabajamos
              </a>
            </div>

            <div className="home-hero__stats">
              <div>
                <strong>10+</strong>
                <span>productos</span>
              </div>

              <div>
                <strong>PLA</strong>
                <span>y PETG</span>
              </div>

              <div>
                <strong>3D</strong>
                <span>fabricación digital</span>
              </div>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__image-wrap">
              <img
                src="/images/products/figura-low-poly.avif"
                alt="Figura decorativa impresa en 3D"
              />
            </div>

            <div className="home-hero__visual-label">
              <span>Selección</span>

              <strong>
                Diseño que toma forma.
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section
        id="proceso"
        className="home-process section"
      >
        <div className="container">
          <header className="home-section-heading">
            <div>
              <span>
                Nuestro enfoque
              </span>

              <h2>
                De una idea a
                <br />
                un objeto físico.
              </h2>
            </div>

            <p>
              La impresión 3D permite convertir
              diseños digitales en objetos
              funcionales capa por capa, con
              libertad para adaptar formas,
              tamaños y detalles.
            </p>
          </header>

          <div className="home-process__grid">
            <article className="home-process__item">
              <span className="home-process__number">
                01
              </span>

              <h3>
                Diseñar
              </h3>

              <p>
                Partimos de una necesidad,
                una función o una idea visual.
              </p>
            </article>

            <article className="home-process__item">
              <span className="home-process__number">
                02
              </span>

              <h3>
                Preparar
              </h3>

              <p>
                Adaptamos el modelo para su
                fabricación mediante impresión 3D.
              </p>
            </article>

            <article className="home-process__item">
              <span className="home-process__number">
                03
              </span>

              <h3>
                Fabricar
              </h3>

              <p>
                El objeto toma forma capa por
                capa hasta convertirse en una
                pieza física.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-showcase">
        <div className="container home-showcase__grid">
          <div className="home-showcase__image home-showcase__image--large">
            <img
              src="/images/products/soporte-auriculares.avif"
              alt="Soporte para auriculares impreso en 3D"
              loading="lazy"
            />
          </div>

          <div className="home-showcase__content">
            <span>
              Funcionalidad
            </span>

            <h2>
              Diseñado para
              formar parte de
              tu espacio.
            </h2>

            <p>
              Objetos pensados para escritorio,
              organización, gaming y decoración,
              con una estética limpia y una
              fabricación precisa.
            </p>

            <Link
              to="/productos"
              className="home-showcase__link"
            >
              Ver todos los productos

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="home-showcase__image home-showcase__image--small">
            <img
              src="/images/products/maceta-geometrica.avif"
              alt="Maceta geométrica impresa en 3D"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home