import api from "../api/Axios.js";

const wilayaService = {
  getAll: async () => {
    const response = await api.get("/admin/wilayas");
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/admin/wilayas", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/admin/wilayas/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/admin/wilayas/${id}`);
    return response.data;
  },
};

export default wilayaService;
