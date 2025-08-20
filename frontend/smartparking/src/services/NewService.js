import api from "../api/axiosInstance";

export const getAllNews = () => {
    return api.get("/api/news")
}

export const getNewById = (id) => {
    return api.get(`/api/news/${id}`);
}
