import React, { useState, useEffect } from 'react';
import productService from '../services/ProductServices';

function CategoryFormModal({ isOpen, onClose, onSubmit, category, mode }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const data = await productService.getAllProducts({ limit: 1000 });
                const products = Array.isArray(data) ? data : data.products || [];
                setAllProducts(products);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoadingProducts(false);
            }
        };

        if (isOpen) {
            fetchProducts();
        }
    }, [isOpen]);

    useEffect(() => {
        if (mode === 'edit' && category) {
            setName(category.name || '');
            setImagePreview(category.image ? `http://localhost:5000/${category.image}` : null);
            // Pre-select products that are currently in this category
            const currentProducts = allProducts.filter(p => {
                const pCatId = p.category && typeof p.category === 'object' ? p.category._id : p.category;
                return pCatId === category._id;
            }).map(p => p._id);
            setSelectedProductIds(currentProducts);
        } else {
            setName('');
            setImage(null);
            setImagePreview(null);
            setSelectedProductIds([]);
        }
    }, [category, mode, isOpen, allProducts]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleProductSelection = (productId) => {
        setSelectedProductIds(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }
        // We pass the selected products back to the parent to handle bulk update
        onSubmit(formData, selectedProductIds);
    };

    const filteredProducts = allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">
                        {mode === 'add' ? 'Ajouter une catégorie' : 'Modifier la catégorie'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-6 overflow-y-auto space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom de la catégorie</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    accept="image/*"
                                    required={mode === 'add'}
                                />
                                {imagePreview && (
                                    <div className="mt-2 text-center">
                                        <img src={imagePreview} alt="Preview" className="h-20 mx-auto rounded-lg shadow-md object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Selection */}
                        <div className="border-t pt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Lier des produits existants ({selectedProductIds.length} sélectionnés)
                            </label>
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg mb-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <div className="h-48 overflow-y-auto border rounded-lg p-2 bg-gray-50">
                                {loadingProducts ? (
                                    <p className="text-center text-gray-500 py-4 text-sm">Chargement des produits...</p>
                                ) : filteredProducts.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4 text-sm">Aucun produit trouvé</p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-1">
                                        {filteredProducts.map(product => (
                                            <div
                                                key={product._id}
                                                onClick={() => toggleProductSelection(product._id)}
                                                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition text-sm ${selectedProductIds.includes(product._id)
                                                    ? 'bg-green-100 border-green-200'
                                                    : 'hover:bg-white bg-transparent border-transparent'
                                                    } border`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.images?.[0] ? `http://localhost:5000/${product.images[0]}` : 'https://via.placeholder.com/40'}
                                                        alt=""
                                                        className="w-8 h-8 rounded object-cover border"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.category || 'Sans catégorie'}</p>
                                                    </div>
                                                </div>
                                                {selectedProductIds.includes(product._id) && (
                                                    <span className="text-green-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 flex justify-end gap-3 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition font-medium"
                        >
                            {mode === 'add' ? 'Ajouter' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryFormModal;
