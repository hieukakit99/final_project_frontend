import axios from "axios";

const API_URL = "https://673a01a7a3a36b5a62f06bdb.mockapi.io";
const API_NAME = "userApi";

export const userApi = {
  /**
   * Lấy danh sách người dùng
   * @returns {Promise<Array>} - Danh sách người dùng
   */
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/${API_NAME}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Tạo mới một người dùng
   * @param {Object} userData - Dữ liệu người dùng cần tạo
   * @returns {Promise<Object>} - Người dùng mới vừa được tạo
   */
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/${API_NAME}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin người dùng
   * @param {String} userId - ID của người dùng cần cập nhật
   * @param {Object} userData - Dữ liệu cập nhật
   * @returns {Promise<Object>} - Dữ liệu người dùng sau khi cập nhật
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(
        `${API_URL}/${API_NAME}/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Xóa một người dùng
   * @param {String} userId - ID của người dùng cần xóa
   * @returns {Promise<Object>} - Dữ liệu người dùng đã bị xóa
   */
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${API_NAME}/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  },
};
