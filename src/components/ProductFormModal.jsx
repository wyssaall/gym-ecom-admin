import React, { useState, useEffect } from 'react'

function ProductFormModal({ isOpen, onClose, onSubmit, product = null, mode = 'add' }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        sizes: '',
        colors: ''
    })
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
        if (product && mode === 'edit') {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                stock: product.stock || '',
                category: product.category || '',
                sizes: product.sizes?.join(', ') || '',
                colors: product.colors?.join(', ') || ''
            })
            // Show existing images
            if (product.images && product.images.length > 0) {
                const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '')
                const existingPreviews = product.images.map(img => `${baseUrl}/${img}`)
                setImagePreviews(existingPreviews)
            }
        } else {
            // Reset form for add mode
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                sizes: '',
                colors: ''
            })
            setImages([])
            setImagePreviews([])
        }
    }, [product, mode, isOpen])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        setError('')
        const newFiles = Array.from(e.target.files)

        if (images.length + newFiles.length > 10) {
            setError('Vous ne pouvez pas uploader plus de 10 images au total.')
            return
        }

        const updatedImages = [...images, ...newFiles]
        setImages(updatedImages)

        // Create previews
        const newPreviews = newFiles.map(file => URL.createObjectURL(file))
        setImagePreviews([...imagePreviews, ...newPreviews])
    }

    const removeImage = (index) => {
        const updatedImages = [...images]
        const updatedPreviews = [...imagePreviews]

        // Revoke URL if it's a preview of a new file
        if (updatedPreviews[index].startsWith('blob:')) {
            URL.revokeObjectURL(updatedPreviews[index])
        }

        updatedImages.splice(index, 1)
        updatedPreviews.splice(index, 1)

        setImages(updatedImages)
        setImagePreviews(updatedPreviews)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (mode === 'add' && images.length === 0) {
            setError('Veuillez ajouter au moins une image.')
            return
        }

        if (images.length > 10) {
            setError('Maximum 10 images autorisées.')
            return
        }

        setLoading(true)

        try {
            const submitData = new FormData()
            submitData.append('name', formData.name.trim())
            submitData.append('description', formData.description.trim())
            submitData.append('price', formData.price)
            submitData.append('stock', formData.stock)
            submitData.append('category', formData.category.trim())

            // Handle Sizes
            if (formData.sizes.trim()) {
                const sizesArray = formData.sizes.split(',').map(s => s.trim()).filter(s => s !== '')
                sizesArray.forEach(size => submitData.append('sizes', size))
            } else {
                // If sizes is empty string, we can either send nothing or an empty array representation
                // Backend usually expects multiple 'sizes' fields for an array
            }

            // Handle Colors
            if (formData.colors.trim()) {
                const colorsArray = formData.colors.split(',').map(c => c.trim()).filter(c => c !== '')
                colorsArray.forEach(color => submitData.append('colors', color))
            }

            // Append images
            images.forEach(image => {
                submitData.append('images', image)
            })

            await onSubmit(submitData)
            onClose()
        } catch (err) {
            console.error('Failed to submit product:', err)
            setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'enregistrement.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 sticky top-0 z-10">
                    <h3 className="text-xl font-bold text-white">
                        {mode === 'edit' ? 'Modifier le produit' : 'Ajouter un produit'}
                    </h3>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom du produit *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: Leggings Sport"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Description du produit..."
                            />
                        </div>

                        {/* Price and Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix (DA) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="2000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="100"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Catégorie *
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: Leggings"
                            />
                        </div>

                        {/* Sizes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tailles (séparées par des virgules)
                            </label>
                            <input
                                type="text"
                                name="sizes"
                                value={formData.sizes}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="S, M, L, XL"
                            />
                        </div>

                        {/* Colors */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Couleurs (séparées par des virgules)
                            </label>
                            <input
                                type="text"
                                name="colors"
                                value={formData.colors}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Noir, Blanc, Bleu"
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Images (1 à 10 images) {mode === 'add' && '*'}
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Vous pouvez sélectionner plusieurs images. Max 10.
                            </p>

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="mt-3 grid grid-cols-3 gap-3">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg"
                                                title="Supprimer cette image"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition font-medium disabled:bg-blue-300"
                        >
                            {loading ? 'Chargement...' : (mode === 'edit' ? 'Modifier' : 'Ajouter')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductFormModal
