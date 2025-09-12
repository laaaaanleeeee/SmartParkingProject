import api from '../api/axiosInstance';

export const getAllParkingLot = (filters = {}) => {
  const {
    name = '',
    city = '',
    ward = '',
    minPrice = null,
    maxPrice = null,
    minRating = null,
    minSlots = null,
    page = 0,
    size = 10,
    sort = 'id,asc'
  } = filters;

  return api.get('/parking-lots', {
    params: {
      name: name || undefined,
      city: city || undefined,
      ward: ward || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      minRating: minRating || undefined,
      minSlots: minSlots || undefined,
      page,
      size,
      sort
    }
  });
};

export const getParkingLotDetail = (id) => {
    return api.get(`/parking-lots/${id}`);
}

export const createParkingLot = (data) => {
  return api.post('/parking-lots', data);
};

export const updateParkingLot = (id, data) => {
  return api.put(`/parking-lots/${id}`, data);
};

export const deleteParkingLot = (id) => {
  return api.delete(`/parking-lots/${id}`);
};

export const getMyParkingLots = (params = {}) => {
  const { page = 0, size = 10, sort = 'id,asc' } = params;
  return api.get('/parking-lots/me', { params: { page, size, sort } });
};

export const createMyParkingLot = (data) => {
  return api.post('/parking-lots/me', data);
};

export const updateMyParkingLot = (id, data) => {
  return api.put(`/parking-lots/me/${id}`, data);
};

export const deleteMyParkingLot = (id) => {
  return api.delete(`/parking-lots/me/${id}`);
};

export const adminGetAllParkingLots = (filters = {}) => {
  const {
    name, city, ward,
    minPrice, maxPrice,
    minRating, minSlots,
    page = 0, size = 10, sort = "id,asc"
  } = filters;

  return api.get("/parking-lots/admin/getAll", {
    params: {
      name, city, ward,
      minPrice, maxPrice,
      minRating, minSlots,
      page, size, sort
    }
  });
};

export const adminGetParkingLotById = (id) => api.get(`/parking-lots/admin/getById/${id}`);
export const adminCreateParkingLot = (data) => api.post("/parking-lots/admin/create", data);
export const adminUpdateParkingLot = (id, data) => api.put(`/parking-lots/admin/update/${id}`, data);
export const adminDeleteParkingLot = (id) => api.delete(`/parking-lots/admin/delete/${id}`);