import api from "../api/Axios.js";

const orderService = {
    getAllOrders: async (params = {}) => {
        const response = await api.get("/admin/orders", { params: { limit: 100, ...params } });
        return response.data;
    },
    updatedOrder : async (id)=>{
        const response = await api.put(`/admin/orders/${id}`);
        return response.data;
    
    },
    deleteOrder : async (id)=>{
        const response = await api.delete(`/admin/orders/${id}`);
        return response.data;
    
    }
}

export default orderService;