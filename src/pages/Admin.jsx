import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import ProductForm from '../components/ProductForm/ProductForm'
import Modal from '../components/Modal/Modal'
import useProducts from '../hooks/useProducts'
import './Admin.css'

const PRODUCTS_URL = 'http://localhost:3000/products'

function Admin() {
  const {
    products,
    setProducts,
    loading,
    error,
  } = useProducts(PRODUCTS_URL)

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null)

  const [
    productToDelete,
    setProductToDelete,
  ] = useState(null)

  const [deleting, setDeleting] =
    useState(false)

  useEffect(() => {
    if (!error) {
      return
    }

    toast.error(
      'No se pudieron cargar los productos',
      {
        toastId: 'admin-products-load-error',
      }
    )
  }, [error])

  const handleCreateProduct = async (
    productData
  ) => {
    try {
      const response = await fetch(
        PRODUCTS_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(productData),
        }
      )

      if (!response.ok) {
        throw new Error(
          'No se pudo crear el producto'
        )
      }

      const createdProduct =
        await response.json()

      setProducts((currentProducts) => [
        ...currentProducts,
        createdProduct,
      ])

      toast.success(
        'Producto creado correctamente'
      )
    } catch (err) {
      toast.error(err.message)

      throw err
    }
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleCancelEdit = () => {
    setSelectedProduct(null)
  }

  const handleUpdateProduct = async (
    productData
  ) => {
    if (!selectedProduct) {
      return
    }

    try {
      const response = await fetch(
        `${PRODUCTS_URL}/${selectedProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            ...productData,
            id: selectedProduct.id,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          'No se pudo actualizar el producto'
        )
      }

      const updatedProduct =
        await response.json()

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product
        )
      )

      setSelectedProduct(null)

      toast.success(
        'Producto actualizado correctamente'
      )
    } catch (err) {
      toast.error(err.message)

      throw err
    }
  }

  const handleRequestDelete = (product) => {
    setProductToDelete(product)
  }

  const handleCancelDelete = () => {
    if (deleting) {
      return
    }

    setProductToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      return
    }

    try {
      setDeleting(true)

      const response = await fetch(
        `${PRODUCTS_URL}/${productToDelete.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error(
          'No se pudo eliminar el producto'
        )
      }

      const deletedProductName =
        productToDelete.name

      const deletedProductId =
        productToDelete.id

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== deletedProductId
        )
      )

      if (
        selectedProduct?.id ===
        deletedProductId
      ) {
        setSelectedProduct(null)
      }

      setProductToDelete(null)

      toast.success(
        `${deletedProductName} eliminado correctamente`
      )
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <main className="container page">
        <header className="page-header">
          <span className="page-header__eyebrow">
            Panel administrativo
          </span>

          <h1>Administración</h1>

          <p>
            Desde este panel podés crear y gestionar
            los productos disponibles en el catálogo.
          </p>
        </header>

        <div className="admin-layout">
          <ProductForm
            key={
              selectedProduct
                ? `edit-${selectedProduct.id}`
                : 'create'
            }
            onSubmit={
              selectedProduct
                ? handleUpdateProduct
                : handleCreateProduct
            }
            selectedProduct={selectedProduct}
            onCancelEdit={handleCancelEdit}
          />

          <section className="admin-products">
            <div className="admin-products__header">
              <div>
                <span>Inventario</span>

                <h2>Productos cargados</h2>
              </div>

              <strong className="admin-products__count">
                {products.length}
              </strong>
            </div>

            {loading && (
              <p className="status-message">
                Cargando productos...
              </p>
            )}

            {error && (
              <p className="status-message status-message--error">
                Error: {error}
              </p>
            )}

            {!loading && !error && (
              <div className="admin-products__list">
                {products.map((product) => (
                  <article
                    className="admin-product"
                    key={product.id}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="admin-product__content">
                      <span>
                        {product.category}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        Stock: {product.stock}
                      </p>
                    </div>

                    <div className="admin-product__actions">
                      <strong>
                        $
                        {product.price.toLocaleString(
                          'es-AR'
                        )}
                      </strong>

                      <div className="admin-product__buttons">
                        <button
                          type="button"
                          className="button button--outline button--small"
                          onClick={() =>
                            handleEditProduct(
                              product
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="button button--danger-outline button--small"
                          onClick={() =>
                            handleRequestDelete(
                              product
                            )
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {productToDelete && (
        <Modal
          title="Eliminar producto"
          confirmText="Eliminar producto"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deleting}
        >
          <p>
            ¿Seguro que querés eliminar{' '}
            <strong>
              {productToDelete.name}
            </strong>
            ?
          </p>

          <p className="modal__warning">
            Esta acción eliminará el producto
            del catálogo.
          </p>
        </Modal>
      )}
    </>
  )
}

export default Admin