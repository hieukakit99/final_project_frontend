import api from "./apiClient";

const API_NAME = "workreports";

const reportEmployeeApi = {
  getAllReports: async () => {
    try {
      const response = await api.get(`${API_NAME}`, {
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

  getReportById: async (id) => {
    try {
      const response = await api.get(`${API_NAME}/${id}`, {
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

  createReport: async (data) => {
    try {
      const response = await api.post(`${API_NAME}/create`, data, {
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

  updateReport: async (id, data) => {
    try {
      const response = await api.put(`${API_NAME}/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error updating report ID (${id}):`,
        error.response?.data || error
      );
      throw new Error("Không thể cập nhật báo cáo.");
    }
  },

  deleteReport: async (id) => {
    try {
      await api.delete(`${API_NAME}/${id}`, {
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

export default reportEmployeeApi;

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
