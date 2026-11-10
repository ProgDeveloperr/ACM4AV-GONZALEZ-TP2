import { useEffect, useState } from 'react'

function useProducts(url) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            'No se pudieron obtener los productos'
          )
        }

        const data = await response.json()

        setProducts(data)
        setError(null)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      controller.abort()
    }
  }, [url])

  return {
    products,
    setProducts,
    loading,
    error,
    setError,
  }
}

export default useProducts