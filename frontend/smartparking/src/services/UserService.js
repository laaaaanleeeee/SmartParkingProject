import api from "@/api/axiosInstance";

export const getAllUsers = (filters = {}) => {
  const {
    page = 0,
    size = 10,
    username = '',
    email = '',
    fullName = ''
  } = filters;

  return api.get('/auth/admin/users', {
    params: {
      page,
      size,
      username: username || undefined,
      email: email || undefined,
      fullName: fullName || undefined
    }
  });
};

export const createUser = (data) => api.post('/auth/admin/users', data);
export const updateUser = (id, data) => api.put(`/auth/admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/auth/admin/users/${id}`);