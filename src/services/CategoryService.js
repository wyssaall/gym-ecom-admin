import api from "../api/Axios.js";

const categoryService = {
    getAllCategories: async () => {
        const response = await api.get("/admin/categories");
        return response.data;
    },
    getCategoryById: async (id) => {
        const response = await api.get(`/admin/categories/${id}`);
        return response.data;
    },
    createCategory: async (categoryData) => {
        const response = await api.post("/admin/categories", categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    updateCategory: async (id, categoryData) => {
        const response = await api.put(`/admin/categories/${id}`, categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    deleteCategory: async (id) => {
        const response = await api.delete(`/admin/categories/${id}`);
        return response.data;
    }
}

export default categoryService;
