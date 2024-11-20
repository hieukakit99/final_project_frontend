import api from "./apiClient";

const API_NAME = "workreports";

const reportApi = {
  // Lấy danh sách yêu cầu với phân trang và bộ lọc
  getAllRequests: async () => {
    try {
      const response = await api.get(`${API_NAME}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all requests:", error);
      throw error;
    }
  },

  // Lấy chi tiết một yêu cầu theo ID
  getRequestById: async (id) => {
    try {
      const response = await api.get(`${API_NAME}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching request by ID (${id}):`, error);
      throw error;
    }
  },

  // Duyệt yêu cầu
  approveRequest: async (id) => {
    try {
      const response = await api.put(`${API_NAME}/${id}`, {
        status: "Approved",
        managerApproved: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Error approving request ID (${id}):`, error);
      throw error;
    }
  },

  // Từ chối yêu cầu với lý do
  rejectRequest: async (id, reason) => {
    try {
      const response = await api.put(`${API_NAME}/${id}`, {
        status: "Rejected",
        managerApproved: false,
        reason,
      });
      return response.data;
    } catch (error) {
      console.error(`Error rejecting request ID (${id}):`, error);
      throw error;
    }
  },
};

export default reportApi;
