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