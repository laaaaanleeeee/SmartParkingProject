import api from "../api/axiosInstance";

export const createBooking = (data) => {
  return api.post("/bookings", data);
};

export const getMyBookings = (params = {}) => {
  return api.get("/bookings/me", { params });
};

export const getBookingById = (id) => {
  return api.get(`/bookings/${id}`);
};

export const cancelBooking = (id, reason) => {
  return api.put(`/bookings/${id}/cancel`, null, {
    params: { reason },
  });
};

export const confirmBooking = (id) => {
  return api.put(`/bookings/${id}/confirm`);
};

export const completeBooking = (id) => {
  return api.put(`/bookings/${id}/complete`);
};
