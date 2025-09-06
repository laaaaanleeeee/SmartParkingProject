import api from "../api/axiosInstance";

export const getAllNews = (filters = {}) => {
  const {
    page = 0,
    size = 10,
    title = '',
    poster = ''
  } = filters;

  return api.get('/news', {
    params: {
      page,
      size,
      title: title || undefined,
      poster: poster || undefined
    }
  });
};

export const getNewById = (id) => {
    return api.get(`/news/${id}`);
}

export const createNews = (data) => api.post('/admin/create-news', data);
export const updateNews = (id, data) => api.put(`/admin/update-news/${id}`, data);
export const deleteNews = (id) => api.delete(`/admin/delete-news/${id}`);