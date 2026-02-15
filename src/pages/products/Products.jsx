import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import productService from '../../services/ProductServices'
import ConfirmModal from '../../components/ConfirmModal'
import ProductFormModal from '../../components/ProductFormModal'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [productToEdit, setProductToEdit] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Fetching products...")
                const data = await productService.getAllProducts()
                console.log("Products data received:", data)

                // Flexible data handling: check if it's {products: [...]} or just [...]
                if (data && Array.isArray(data.products)) {
                    setProducts(data.products)
                } else if (Array.isArray(data)) {
                    setProducts(data)
                } else {
                    console.error("Unexpected data format:", data)
                    setError("Format de données invalide reçu du serveur")
                }

                setLoading(false)
            } catch (err) {
                console.error("Failed to fetch products:", err)
                const msg = err.response?.data?.message || err.message || "Erreur de connexion au serveur"
                setError(`Échec du chargement des produits : ${msg}`)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleDeleteClick = (product) => {
        setProductToDelete(product)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        try {
            await productService.deleteProduct(productToDelete._id)
            setProducts(products.filter(p => p._id !== productToDelete._id))
            setShowDeleteModal(false)
            setProductToDelete(null)
        } catch (err) {
            console.error("Failed to delete product", err)
            alert('Failed to delete product')
        }
    }

    const cancelDelete = () => {
        setShowDeleteModal(false)
        setProductToDelete(null)
    }

    const handleAddProduct = async (formData) => {
        try {
            console.log('Creating product with FormData:', formData)
            const result = await productService.createProduct(formData)
            console.log('Product created successfully:', result)
            const data = await productService.getAllProducts()
            setProducts(data.products)
            setShowAddModal(false)
        } catch (err) {
            console.error("Failed to create product:", err)
            console.error("Error response:", err.response?.data)
            alert(`Failed to create product: ${err.response?.data?.message || err.message}`)
        }
    }

    const handleEditClick = (product) => {
        setProductToEdit(product)
        setShowEditModal(true)
    }

    const handleEditProduct = async (formData) => {
        try {
            await productService.updateProduct(productToEdit._id, formData)
            const data = await productService.getAllProducts()
            setProducts(data.products)
            setShowEditModal(false)
            setProductToEdit(null)
        } catch (err) {
            console.error("Failed to update product", err)
            alert('Failed to update product')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
                <p className="text-gray-600">Loading products...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center gap-4">
                <p className="text-red-600 font-bold bg-white px-6 py-3 rounded-lg shadow-sm border border-red-200">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* titre */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    Produits
                </h1>
                <p className="text-gray-500 text-sm">
                    {products.length} produit(s) trouvé(s)
                </p>
            </div>

            {/* table des produits */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom produit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categorie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    Aucun produit trouvé
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price} DA</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? 'Disponible' : 'Rupture'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition cursor-pointer"
                                        >
                                            Supprimer
                                        </button>
                                        <Link to={`/products/${product._id}`} className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition cursor-pointer">Voir</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Ajouter produit */}
            <div className="mt-6 text-right">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Ajouter un produit
                </button>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer le produit "${productToDelete?.name}" ? Cette action est irréversible.`}
            />

            {/* Add Product Modal */}
            <ProductFormModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddProduct}
                mode="add"
            />

            {/* Edit Product Modal */}
            <ProductFormModal
                isOpen={showEditModal}
                onClose={() => { setShowEditModal(false); setProductToEdit(null); }}
                onSubmit={handleEditProduct}
                product={productToEdit}
                mode="edit"
            />
        </div>
    )
}

export default Products
