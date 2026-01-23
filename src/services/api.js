import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:5000/api",
})

Api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token")

    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
    
})

// Api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default Api;