import axiosInstance from "../../utils/axiosInstance";
const listInfo = {
    getAllList(){
        return axiosInstance.get(`listInfo/getAllList`)
    }
}

export default listInfo;