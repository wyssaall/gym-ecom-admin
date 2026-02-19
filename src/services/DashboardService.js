import api from "../api/Axios.js";

const dashboardService = {
  getStats: async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
  },
};

export default dashboardService;
