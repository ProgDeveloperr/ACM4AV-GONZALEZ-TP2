import {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import './ProductDetail.css'

const PRODUCTS_URL =
  'http://localhost:3000/products'

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  useEffect(() => {
    const controller =
      new AbortController()

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${PRODUCTS_URL}/${id}`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error(
            'Producto no encontrado'
          )
        }

        const data = await response.json()

        setProduct(data)
        setError(null)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setProduct(null)
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      controller.abort()
    }
  }, [id])

  if (loading) {
    return (
      <main className="container page">
        <p className="status-message">
          Cargando producto...
        </p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="container page">
        <section className="product-error">
          <span>
            Catálogo
          </span>

          <h1>
            Producto no encontrado.
          </h1>

          <p>
            El producto solicitado no existe
            o ya no está disponible.
          </p>

          <Link
            to="/productos"
            className="button button--dark"
          >
            Volver al catálogo
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="product-page">
      <div className="container product-page__inner">
        <div className="product-page__topbar">
          <Link
            to="/productos"
            className="product-page__back"
          >
            <span aria-hidden="true">
              ←
            </span>

            Volver al catálogo
          </Link>

          <span className="product-page__index">
            Producto /{' '}
            {String(product.id).padStart(
              2,
              '0'
            )}
          </span>
        </div>

        <section className="product-showcase">
          <div className="product-showcase__media">
            <img
              src={product.image}
              alt={product.name}
              className="product-showcase__image"
              decoding="async"
            />

            {product.customizable && (
              <span className="product-showcase__badge">
                Personalizable
              </span>
            )}
          </div>

          <div className="product-showcase__content">
            <div className="product-showcase__heading">
              <span className="product-showcase__category">
                {product.category}
              </span>

              <h1>
                {product.name}
              </h1>
            </div>

            <p className="product-showcase__description">
              {product.description}
            </p>

            <strong className="product-showcase__price">
              $
              {product.price.toLocaleString(
                'es-AR'
              )}
            </strong>

            <dl className="product-specs">
              <div className="product-specs__row">
                <dt>
                  Material
                </dt>

                <dd>
                  {product.material}
                </dd>
              </div>

              <div className="product-specs__row">
                <dt>
                  Stock disponible
                </dt>

                <dd>
                  {product.stock}{' '}
                  {product.stock === 1
                    ? 'unidad'
                    : 'unidades'}
                </dd>
              </div>

              <div className="product-specs__row">
                <dt>
                  Personalizable
                </dt>

                <dd>
                  {product.customizable
                    ? 'Sí'
                    : 'No'}
                </dd>
              </div>
            </dl>

            <div className="product-showcase__production">
              <span>
                Fabricación
              </span>

              <p>
                Producto realizado mediante
                fabricación digital e impresión
                3D.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProductDetail