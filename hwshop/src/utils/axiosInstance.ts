import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 60000,
    timeoutErrorMessage: "请求服务器超时"
})
axiosInstance.interceptors.request.use(req => {
    return req;
    
})


axiosInstance.interceptors.response.use(resp => {
    if (resp.data.code === 1) {
        return Promise.resolve(resp.data);
    }
    else {
        return Promise.reject(resp.data);
    }
})
export default axiosInstance;