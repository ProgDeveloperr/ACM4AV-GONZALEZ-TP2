import { useState } from 'react'
import './ProductForm.css'

const emptyFormData = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  image: '/images/product-placeholder.svg',
  material: 'PLA',
  customizable: false,
}

function getInitialFormData(selectedProduct) {
  if (!selectedProduct) {
    return {
      ...emptyFormData,
    }
  }

  return {
    name: selectedProduct.name ?? '',
    description: selectedProduct.description ?? '',
    price: String(selectedProduct.price ?? ''),
    category: selectedProduct.category ?? '',
    stock: String(selectedProduct.stock ?? ''),
    image:
      selectedProduct.image ??
      '/images/product-placeholder.svg',
    material: selectedProduct.material ?? 'PLA',
    customizable: Boolean(
      selectedProduct.customizable
    ),
  }
}

function ProductForm({
  onSubmit,
  selectedProduct,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(selectedProduct)
  )

  const [submitting, setSubmitting] =
    useState(false)

  const [formError, setFormError] =
    useState(null)

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setFormError(null)

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    if (
      !productData.name.trim() ||
      !productData.description.trim() ||
      !productData.category.trim() ||
      !productData.material.trim()
    ) {
      setFormError(
        'Completá todos los campos obligatorios.'
      )

      return
    }

    if (productData.price <= 0) {
      setFormError(
        'El precio debe ser mayor a cero.'
      )

      return
    }

    if (productData.stock < 0) {
      setFormError(
        'El stock no puede ser negativo.'
      )

      return
    }

    try {
      setSubmitting(true)

      await onSubmit(productData)

      if (!selectedProduct) {
        setFormData({
          ...emptyFormData,
        })
      }
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
    >
      <div className="product-form__header">
        <span>
          {selectedProduct
            ? 'Editando producto'
            : 'Nuevo producto'}
        </span>

        <h2>
          {selectedProduct
            ? 'Modificar producto'
            : 'Agregar al catálogo'}
        </h2>

        <p>
          {selectedProduct
            ? 'Actualizá la información del producto seleccionado.'
            : 'Cargá la información del producto que querés publicar.'}
        </p>
      </div>

      {formError && (
        <p className="form-error">
          {formError}
        </p>
      )}

      <div className="product-form__grid">
        <label className="form-field">
          <span>Nombre *</span>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Portalápices Hexagonal"
            required
          />
        </label>

        <label className="form-field">
          <span>Categoría *</span>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Seleccionar categoría
            </option>

            <option value="Escritorio">
              Escritorio
            </option>

            <option value="Gaming">
              Gaming
            </option>

            <option value="Organización">
              Organización
            </option>

            <option value="Decoración">
              Decoración
            </option>

            <option value="Personalizados">
              Personalizados
            </option>
          </select>
        </label>

        <label className="form-field">
          <span>Precio *</span>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="1"
            step="1"
            placeholder="7000"
            required
          />
        </label>

        <label className="form-field">
          <span>Stock *</span>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            step="1"
            placeholder="10"
            required
          />
        </label>

        <label className="form-field">
          <span>Material *</span>

          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
          >
            <option value="PLA">
              PLA
            </option>

            <option value="PETG">
              PETG
            </option>

            <option value="ABS">
              ABS
            </option>

            <option value="TPU">
              TPU
            </option>
          </select>
        </label>

        <label className="form-field">
          <span>Imagen *</span>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-field form-field--full">
          <span>Descripción *</span>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Descripción del producto..."
            required
          />
        </label>

        <label className="form-checkbox form-field--full">
          <input
            type="checkbox"
            name="customizable"
            checked={formData.customizable}
            onChange={handleChange}
          />

          <span>
            Este producto puede personalizarse
          </span>
        </label>
      </div>

      <div className="product-form__actions">
        <button
          type="submit"
          className="button button--dark"
          disabled={submitting}
        >
          {submitting
            ? 'Guardando...'
            : selectedProduct
              ? 'Guardar cambios'
              : 'Crear producto'}
        </button>

        {selectedProduct && (
          <button
            type="button"
            className="button button--outline"
            onClick={onCancelEdit}
            disabled={submitting}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  )
}

export default ProductForm