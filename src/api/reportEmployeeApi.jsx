import axios from "axios";

const API_BASE_URL = "https://673a01a7a3a36b5a62f06bdb.mockapi.io"; // MockAPI Base URL
const API_NAME = "reportEmployeeApi";

const reportEmployeeApi = {
  /**
   * Lấy danh sách báo cáo với phân trang, tìm kiếm và lọc.
   * @param {object} params - Các tham số query (page, limit, search, filter).
   * @returns {Promise} - Dữ liệu danh sách báo cáo.
   */
  getAllReports: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${API_NAME}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết một báo cáo theo ID.
   * @param {string} id - ID của báo cáo.
   * @returns {Promise} - Dữ liệu chi tiết báo cáo.
   */
  getReportById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${API_NAME}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching report by ID (${id}):`, error);
      throw error;
    }
  },

  /**
   * Tạo mới một báo cáo.
   * @param {object} data - Dữ liệu báo cáo cần tạo.
   * @returns {Promise} - Dữ liệu báo cáo vừa tạo.
   */
  createReport: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${API_NAME}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  },

  /**
   * Cập nhật một báo cáo theo ID.
   * @param {string} id - ID của báo cáo.
   * @param {object} data - Dữ liệu cập nhật cho báo cáo.
   * @returns {Promise} - Dữ liệu báo cáo đã cập nhật.
   */
  updateReport: async (id, data) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${API_NAME}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating report ID (${id}):`, error);
      throw error;
    }
  },

  /**
   * Xóa một báo cáo theo ID.
   * @param {string} id - ID của báo cáo cần xóa.
   * @returns {Promise} - Xác nhận xóa thành công.
   */
  deleteReport: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${API_NAME}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting report ID (${id}):`, error);
      throw error;
    }
  },

  /**
   * Duyệt một báo cáo.
   * @param {string} id - ID của báo cáo.
   * @returns {Promise} - Dữ liệu báo cáo đã được duyệt.
   */
  approveReport: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${API_NAME}/${id}`, {
        status: "Approved",
        managerApproved: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Error approving report ID (${id}):`, error);
      throw error;
    }
  },

  /**
   * Từ chối một báo cáo với lý do.
   * @param {string} id - ID của báo cáo.
   * @param {string} reason - Lý do từ chối.
   * @returns {Promise} - Dữ liệu báo cáo đã bị từ chối.
   */
  rejectReport: async (id, reason) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${API_NAME}/${id}`, {
        status: "Rejected",
        managerApproved: false,
        reason,
      });
      return response.data;
    } catch (error) {
      console.error(`Error rejecting report ID (${id}):`, error);
      throw error;
    }
  },
};

export default reportEmployeeApi;
