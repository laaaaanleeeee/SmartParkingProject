import api from "../api/axiosInstance";

export const getSlotByParkingLotId = (id) => {
    return api.get(`/slots/parking-lot/${id}`);
}