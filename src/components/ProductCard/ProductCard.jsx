import { Link } from 'react-router-dom'

import './ProductCard.css'

function ProductCard({
  id,
  name,
  price,
  category,
  image,
  material,
  customizable,
}) {
  return (
    <article className="catalog-card">
      <Link
        to={`/productos/${id}`}
        className="catalog-card__media"
        aria-label={`Ver ${name}`}
      >
        <img
          className="catalog-card__image"
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
        />

        {customizable && (
          <span className="catalog-card__badge">
            Personalizable
          </span>
        )}
      </Link>

      <div className="catalog-card__content">
        <div className="catalog-card__meta">
          <span className="catalog-card__category">
            {category}
          </span>

          <span className="catalog-card__material">
            {material}
          </span>
        </div>

        <Link
          to={`/productos/${id}`}
          className="catalog-card__title-link"
        >
          <h2 className="catalog-card__title">
            {name}
          </h2>
        </Link>

        <p className="catalog-card__caption">
          Fabricado mediante impresión 3D
        </p>

        <div className="catalog-card__footer">
          <strong className="catalog-card__price">
            ${price.toLocaleString('es-AR')}
          </strong>

          <Link
            to={`/productos/${id}`}
            className="catalog-card__link"
          >
            Ver producto

            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard