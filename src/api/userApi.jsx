import axios from "axios";

const API_URL = "https://673a01a7a3a36b5a62f06bdb.mockapi.io";
const API_NAME = "userApi";

export const userApi = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/${API_NAME}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/${API_NAME}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

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
