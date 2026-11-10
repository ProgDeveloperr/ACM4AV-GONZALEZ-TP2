import { useState } from 'react'

import ProductCard from '../components/ProductCard/ProductCard'
import useProducts from '../hooks/useProducts'

import './Products.css'

const PRODUCTS_URL =
  'http://localhost:3000/products'

function Products() {
  const {
    products,
    loading,
    error,
  } = useProducts(PRODUCTS_URL)

  const [search, setSearch] =
    useState('')

  const normalizedSearch = search
    .trim()
    .toLowerCase()

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(normalizedSearch)
    )

  if (loading) {
    return (
      <main className="container page">
        <p className="status-message">
          Cargando productos...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container page">
        <p className="status-message status-message--error">
          Error: {error}
        </p>
      </main>
    )
  }

  return (
    <main className="container page catalog-page">
      <header className="catalog-hero">
        <div className="catalog-hero__copy">
          <span className="catalog-hero__eyebrow">
            Catálogo
          </span>

          <h1>
            Objetos que combinan
            diseño y fabricación.
          </h1>

          <p>
            Productos funcionales,
            decorativos y personalizables
            fabricados mediante impresión 3D.
          </p>
        </div>

        <div className="catalog-hero__counter">
          <strong>
            {String(products.length).padStart(
              2,
              '0'
            )}
          </strong>

          <span>
            productos
            <br />
            disponibles
          </span>
        </div>
      </header>

      <section
        className="catalog-toolbar"
        aria-label="Herramientas del catálogo"
      >
        <label className="catalog-search">
          <span>
            Buscar producto
          </span>

          <div className="catalog-search__control">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Soporte, maceta, llavero..."
            />

            <span
              className="catalog-search__icon"
              aria-hidden="true"
            >
              ⌕
            </span>
          </div>
        </label>

        <p className="catalog-results">
          <strong>
            {filteredProducts.length}
          </strong>{' '}
          {filteredProducts.length === 1
            ? 'resultado'
            : 'resultados'}
        </p>
      </section>

      {filteredProducts.length > 0 ? (
        <section className="catalog-grid">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
                material={product.material}
                customizable={
                  product.customizable
                }
              />
            )
          )}
        </section>
      ) : (
        <section className="catalog-empty">
          <span>
            Sin coincidencias
          </span>

          <h2>
            No encontramos ese producto.
          </h2>

          <p>
            Probá con otro nombre o eliminá
            el texto del buscador para volver
            a ver el catálogo completo.
          </p>
        </section>
      )}
    </main>
  )
}

export default Products