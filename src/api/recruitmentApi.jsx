import axios from "axios";

const API_URL = "https://65a14790600f49256fb15464.mockapi.io";

export const recruitmentApi = {
  /**
   * Fetch all candidates
   * @returns {Promise<Array>} List of candidates
   */
  getCandidates: async () => {
    try {
      const response = await axios.get(`${API_URL}/recruitmentApi`);
      return response.data;
    } catch (error) {
      console.error("Error fetching candidates:", error);
      throw error;
    }
  },

  /**
   * Fetch a single candidate by ID
   * @param {string} candidateId - The ID of the candidate
   * @returns {Promise<Object>} Candidate details
   */
  getCandidateById: async (candidateId) => {
    try {
      const response = await axios.get(
        `${API_URL}/recruitmentApi/${candidateId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching candidate with ID ${candidateId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new candidate
   * @param {Object} candidateData - The candidate data to be created
   * @returns {Promise<Object>} The created candidate
   */
  createCandidate: async (candidateData) => {
    try {
      const response = await axios.post(
        `${API_URL}/recruitmentApi`,
        candidateData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating candidate:", error);
      throw error;
    }
  },

  /**
   * Update an existing candidate
   * @param {string} candidateId - The ID of the candidate
   * @param {Object} candidateData - The updated candidate data
   * @returns {Promise<Object>} The updated candidate
   */
  updateCandidate: async (candidateId, candidateData) => {
    try {
      const response = await axios.put(
        `${API_URL}/recruitmentApi/${candidateId}`,
        candidateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating candidate with ID ${candidateId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a candidate by ID
   * @param {string} candidateId - The ID of the candidate to delete
   * @returns {Promise<Object>} Response from the API
   */
  deleteCandidate: async (candidateId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/recruitmentApi/${candidateId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting candidate with ID ${candidateId}:`, error);
      throw error;
    }
  },
};
