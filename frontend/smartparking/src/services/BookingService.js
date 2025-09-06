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


export const getAllBookings = (filters = {}) => {
  const {
    page = 0,
    size = 10,
    username = "",
    status = "",
    lotId = "",
  } = filters;

  return api.get("/bookings/admin/all-bookings", {
    params: {
      page,
      size,
      username: username || undefined,
      status: status || undefined,
      lotId: lotId || undefined,
    },
  });
};


export const adminCreateBooking = (data) => api.post("/bookings/admin/create", data);
export const adminUpdateBooking = (id, data) => api.put(`/bookings/admin/update/${id}`, data);
export const adminDeleteBooking = (id) => api.delete(`/bookings/admin/delete/${id}`);