import axios from "axios";

const API_URL = "https://65a14790600f49256fb15464.mockapi.io";

export const trainingApi = {
  getTrainings: async () => {
    try {
      const response = await axios.get(`${API_URL}/trainingApi`);
      return response.data;
    } catch (error) {
      console.error("Error fetching trainings:", error);
      throw error;
    }
  },

  getTrainingById: async (trainingId) => {
    try {
      const response = await axios.get(`${API_URL}/trainingApi/${trainingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching training with ID ${trainingId}:`, error);
      throw error;
    }
  },

  createTraining: async (trainingData) => {
    try {
      const response = await axios.post(`${API_URL}/trainingApi`, trainingData);
      return response.data;
    } catch (error) {
      console.error("Error creating training:", error);
      throw error;
    }
  },

  updateTraining: async (trainingId, trainingData) => {
    try {
      const response = await axios.put(
        `${API_URL}/trainingApi/${trainingId}`,
        trainingData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating training with ID ${trainingId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a training class by ID
   * @param {string} trainingId - The ID of the training to delete
   * @returns {Promise<Object>} Response from the API
   */
  deleteTraining: async (trainingId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/trainingApi/${trainingId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting training with ID ${trainingId}:`, error);
      throw error;
    }
  },
};
