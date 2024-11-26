import axios from "axios";

const API_BASE_URL = "https://673a01a7a3a36b5a62f06bdb.mockapi.io"; // MockAPI Base URL
const API_NAME = "reportEmployeeApi";

const requestEmployeeApi = {
  getAllRequests: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${API_NAME}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error.response?.data || error);
      throw new Error("Không thể tải danh sách báo cáo.");
    }
  },

  getRequestById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${API_NAME}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching report by ID (${id}):`,
        error.response?.data || error
      );
      throw new Error("Không thể tải thông tin báo cáo.");
    }
  },

  createRequest: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${API_NAME}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating report:", error.response?.data || error);
      throw new Error("Không thể tạo báo cáo.");
    }
  },

  updateRequest: async (id, data) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${API_NAME}/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating report ID (${id}):`,
        error.response?.data || error
      );
      throw new Error("Không thể cập nhật báo cáo.");
    }
  },

  deleteRequest: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${API_NAME}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error(
        `Error deleting report ID (${id}):`,
        error.response?.data || error
      );
      throw new Error("Không thể xóa báo cáo.");
    }
  },
};

export default requestEmployeeApi;

export const REPORT_TYPES = {
  EVALUATION: "evaluation",
  RECRUITMENT: "recruitment",
  TRAINING: "training",
};

export const REPORT_STATUSES = {
  UNFINISHED: "Unfinished",
  IN_PROGRESS: "In Progress",
  COMPLETE: "Complete",
};
