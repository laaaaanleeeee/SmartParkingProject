import api from "../api/axiosInstance";

export const getAllNews = () => {
    return api.get("/news")
}

export const getNewById = (id) => {
    return api.get(`/news/${id}`);
}
