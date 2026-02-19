import React, { useState, useEffect } from 'react';
import categoryService from '../../services/CategoryService';
import productService from '../../services/ProductServices';
import ConfirmModal from '../../components/ConfirmModal';
import CategoryFormModal from '../../components/CategoryFormModal';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [catData, prodData] = await Promise.all([
                categoryService.getAllCategories(),
                productService.getAllProducts({ limit: 1000 })
            ]);

            setCategories(Array.isArray(catData) ? catData : catData.categories || []);

            // Handle different product response formats
            if (prodData && Array.isArray(prodData.products)) {
                setProducts(prodData.products);
            } else if (Array.isArray(prodData)) {
                setProducts(prodData);
            }

            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError("Erreur lors du chargement des données.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setActionLoading(true);
            await categoryService.deleteCategory(categoryToDelete._id);
            setCategories(categories.filter(c => c._id !== categoryToDelete._id));
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        } catch (err) {
            console.error("Failed to delete category", err);
            alert(`Erreur lors de la suppression: ${err.response?.data?.message || err.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleAddCategory = async (formData, productIds) => {
        try {
            const response = await categoryService.createCategory(formData);
            const newCat = response.newCategory;

            // Link products if selected
            if (productIds && productIds.length > 0) {
                await productService.updateProductsCategory(productIds, newCat._id);
            }

            await fetchData();
            setShowAddModal(false);
        } catch (err) {
            console.error("Critical error in handleAddCategory:", err);
            // Re-throw the error so CategoryFormModal's try-catch can catch it and show it in the UI
            throw err;
        }
    };

    const handleEditClick = (category) => {
        setCategoryToEdit(category);
        setShowEditModal(true);
    };

    const handleEditCategory = async (formData, productIds) => {
        try {
            const response = await categoryService.updateCategory(categoryToEdit._id, formData);
            const updatedCat = response.updatedCategory;

            // Handle bulk product category updates
            if (productIds && productIds.length > 0) {
                await productService.updateProductsCategory(productIds, updatedCat._id);
            }

            await fetchData();
            setShowEditModal(false);
            setCategoryToEdit(null);
        } catch (err) {
            console.error("Critical error in handleEditCategory:", err);
            // Re-throw to show in modal
            throw err;
        }
    };

    const getProductsForCategory = (categoryId) => {
        return products.filter(p => {
            const pCatId = p.category && typeof p.category === 'object' ? p.category._id : p.category;
            return pCatId === categoryId;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
                <p className="text-gray-600">Chargement des catégories...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Titre */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Catégories</h1>
                <p className="text-gray-500 text-sm">Liste des catégories et leurs produits</p>
            </div>

            {/* Table des catégories */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom catégorie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de produits</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                    Aucune catégorie trouvée.
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => {
                                const catProducts = getProductsForCategory(cat._id);
                                return (
                                    <tr key={cat._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={`${baseUrl}/${cat.image}`}
                                                alt={cat.name}
                                                className="h-10 w-10 rounded-full object-cover shadow-sm border border-gray-200"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40' }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{cat.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {catProducts.slice(0, 3).map((prod, i) => (
                                                    <span key={prod._id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                                                        {prod.name}
                                                    </span>
                                                ))}
                                                {catProducts.length > 3 && (
                                                    <span className="text-gray-500 text-xs self-center">+{catProducts.length - 3} de plus</span>
                                                )}
                                                {catProducts.length === 0 && (
                                                    <span className="text-gray-400 text-xs italic">Aucun produit</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                                {catProducts.length} produits
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2 flex-wrap">
                                            <button
                                                onClick={() => handleEditClick(cat)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition shadow-sm"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(cat)}
                                                disabled={catProducts.length > 0}
                                                title={catProducts.length > 0 ? "Vous ne pouvez pas supprimer une catégorie contenant des produits" : ""}
                                                className={`px-3 py-1 rounded-md transition shadow-sm ${catProducts.length > 0
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-red-500 text-white hover:bg-red-600"
                                                    }`}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Ajouter catégorie */}
            <div className="mt-6 text-right">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition font-medium shadow-md"
                >
                    Ajouter une catégorie
                </button>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Supprimer la catégorie"
                message={`Voulez-vous vraiment supprimer la catégorie "${categoryToDelete?.name}" ?`}
            />

            <CategoryFormModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddCategory}
                mode="add"
            />

            <CategoryFormModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSubmit={handleEditCategory}
                category={categoryToEdit}
                mode="edit"
            />
        </div>
    );
}

export default Categories;
