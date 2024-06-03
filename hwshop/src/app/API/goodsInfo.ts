import axiosInstance from "../../utils/axiosInstance";
const goodsInfo = {
    getListByPageForCategory({ category_id, pageIndex, startMoney, endMoney }: { category_id: number, pageIndex: number, startMoney: number, endMoney: number }) {
        return axiosInstance.get(`/goodsInfo/getListByPageForCategory`, {
            params: {
                category_id,
                pageIndex,
                startMoney,
                endMoney
            }
        })
    },
    findById({ id }: { id: number }) {
        return axiosInstance.get(`/goodsInfo/findById/${id}`)
    },
    getAreaLevelList(){
        return axiosInstance.get(`area/getAreaLevelList`)
    }
}

export default goodsInfo; 