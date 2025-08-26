import api from '../api/axiosInstance';

export const getMyVehicles = () => {
  return api.get('/vehicles/me');
};

export const createVehicle = (vehicleData) => {
  return api.post('/vehicles', vehicleData);
};

export const updateVehicle = (vehicleId, vehicleData) => {
  return api.put(`/vehicles/${vehicleId}`, vehicleData);
};

export const deleteVehicle = (vehicleId) => {
  return api.delete(`/vehicles/${vehicleId}`);
};
