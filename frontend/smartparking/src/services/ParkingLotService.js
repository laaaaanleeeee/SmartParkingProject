import api from '../api/axiosInstance';

export const getAllParkingLot = () => {
    return api.get("/api/parking-lots");
}

export const getParkingLotDetail = (id) => {
    return api.get(`/api/parking-lots/${id}`);
}
