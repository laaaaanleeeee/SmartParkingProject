import api from "../api/axiosInstance";

export const createPayment = (data) => {
  return api.post("/payments/create", data);
};

export const getPaymentByBooking = (bookingId) => {
  return api.get(`/payments/booking/${bookingId}`);
};

export const refundPayment = (paymentId) => {
  return api.post(`/payments/${paymentId}/refund`);
};
