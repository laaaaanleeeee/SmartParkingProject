import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getAllNews, createNews, updateNews, deleteNews } from "@/services/NewsService";
import { useTheme } from "@/hooks/useTheme";

const ManageNews = () => {
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const inputClass = `w-full px-3 py-2 rounded-lg border ${
    theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"
  } focus:outline-none focus:ring focus:ring-blue-400`;

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await getAllNews({ page: 0, size: 20 });
      setNewsList(res.data.listDTO);
    } catch (error) {
      console.error(error);
      message.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      message.success("Deleted successfully");
      fetchNews();
    } catch {
      message.error("Failed to delete");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    try {
      if (editingNews) {
        await updateNews(editingNews.id, values);
        message.success("Updated successfully");
      } else {
        await createNews(values);
        message.success("Created successfully");
      }
      setShowModal(false);
      fetchNews();
    } catch {
      message.error("Failed to save");
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow ${bgClass} ${textClass} min-h-screen`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage News</h1>
        <button
          onClick={() => {
            setEditingNews(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Add News
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg">
          <thead className={theme === "dark" ? "bg-gray-800" : "bg-gray-200"}>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Content</th>
              <th className="px-4 py-2 text-left">Posted By</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr
                key={news.id}
                className={theme === "dark" ? "border-b border-gray-700 hover:bg-gray-800" : "border-b hover:bg-gray-100"}
              >
                <td className="px-4 py-2">{news.id}</td>
                <td className="px-4 py-2">{news.title}</td>
                <td className="px-4 py-2">{news.content}</td>
                <td className="px-4 py-2">{news.postedBy?.username}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingNews(news);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {newsList.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center italic">
                  No news found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSave}
            className={`p-6 rounded-lg shadow-lg w-96 ${bgClass}`}
          >
            <h2 className="text-xl font-bold mb-4">{editingNews ? "Edit News" : "Add News"}</h2>
            <input
              name="title"
              placeholder="Title"
              defaultValue={editingNews?.title}
              className={`${inputClass} mb-3`}
            />
            <textarea
              name="content"
              placeholder="Content"
              defaultValue={editingNews?.content}
              className={`${inputClass} mb-3`}
              rows="4"
            />
            <input
              name="postedById"
              placeholder="Poster ID"
              type="number"
              defaultValue={editingNews?.postedById}
              className={`${inputClass} mb-3`}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
