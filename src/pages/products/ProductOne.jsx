import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../services/ProductServices";
import ConfirmModal from "../../components/ConfirmModal";
import ProductFormModal from "../../components/ProductFormModal";

function ProductOne() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fetchProduct = async () => {
    try {
      const data = await productService.getProductById(productId)
      setProduct(data)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch product:", err)
      const msg = err.response?.data?.message || err.message || "Erreur de connexion au serveur"
      setError(`Échec du chargement du produit : ${msg}`)
      setLoading(false)
    }
  }

  const nextImage = () => {
    if (product?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleDelete = async () => {
    try {
      await productService.deleteProduct(productId)
      navigate('/products') // Redirect to products list after deletion
    } catch (err) {
      console.error("Failed to delete product", err)
      alert('Failed to delete product')
    }
  }

  const handleEdit = async (formData) => {
    try {
      console.log('Updating product with ID:', productId, 'and FormData:', formData)
      const result = await productService.updateProduct(productId, formData)
      console.log('Product updated successfully:', result)
      await fetchProduct() // Refresh product data
      setShowEditModal(false)
    } catch (err) {
      console.error("Failed to update product:", err)
      console.error("Error response:", err.response?.data)
      alert(`Failed to update product: ${err.response?.data?.message || err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <p className="text-gray-600">Chargement du produit...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <p className="text-red-600">{error || 'Produit non trouvé'}</p>
      </div>
    )
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '')

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      {/* Card produit */}
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 flex flex-col lg:flex-row gap-6">

        {/* Image / Carousel Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative group flex justify-center items-center bg-gray-50 rounded-2xl overflow-hidden aspect-square">
            <img
              src={product.images && product.images[currentImageIndex]
                ? `${baseUrl}/${product.images[currentImageIndex]}`
                : "https://via.placeholder.com/400"}
              alt={product.name}
              className="rounded-2xl object-contain max-h-[400px] w-full h-full"
            />

            {/* Nav Buttons */}
            {product.images?.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${currentImageIndex === idx ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img src={`${baseUrl}/${img}`} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Détails */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Titre */}
          <h1 className="text-2xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            {product.description || 'Pas de description disponible'}
          </p>

          {/* Infos produit */}
          <div className="flex flex-col gap-2 text-gray-700">
            <p><span className="font-semibold">Prix :</span> {product.price} DZD</p>
            <p><span className="font-semibold">Catégorie :</span> {product.category}</p>
            <p><span className="font-semibold">Stock :</span> {product.stock}</p>
            {product.sizes && product.sizes.length > 0 && (
              <p><span className="font-semibold">Tailles disponibles :</span> {product.sizes.join(', ')}</p>
            )}
            {product.colors && product.colors.length > 0 && (
              <p><span className="font-semibold">Couleurs disponibles :</span> {product.colors.join(', ')}</p>
            )}
            <p>
              <span className="font-semibold">Status :</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? ' Disponible' : ' Rupture'}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Modifier
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Supprimer
            </button>
          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ? Cette action est irréversible.`}
      />

      {/* Edit Product Modal */}
      <ProductFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEdit}
        product={product}
        mode="edit"
      />
    </div>
  );
}

export default ProductOne;
