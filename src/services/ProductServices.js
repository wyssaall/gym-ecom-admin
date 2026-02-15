import api from "../api/Axios.js";

const productService = {
  getAllProducts: async (params = {}) => {
    const response = await api.get("/admin/products", { params });
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post("/admin/products", productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/admin/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
  },
  updateProductsCategory: async (productIds, categoryId) => {
    const response = await api.patch("/admin/products/bulk-category", { productIds, categoryId });
    return response.data;
  }
}

export default productService;