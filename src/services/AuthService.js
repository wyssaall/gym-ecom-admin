import api from "../api/Axios.js"


const authService = {
    login: async(email, password)=>{
     // Defines the endpoint: POST /api/admin/login
      const response =await api.post("/admin/login", { email, password });
      return response.data; 
    },

    register: async (userData) => {
    // Defines the endpoint: POST /api/admin/register
    const response = await api.post("/admin/register", userData);
    return response.data;
    },

     logout: () => {
    localStorage.removeItem("token");
  },

}

export default authService;