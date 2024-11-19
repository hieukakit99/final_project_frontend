import axios from "axios";

const API_BASE_URL = "https://673a01a7a3a36b5a62f06bdb.mockapi.io"; // MockAPI Base URL
const API_NAME = "reportEmployeeApi";

const reportEmployeeApi = {
  getAllReports: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${API_NAME}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error.response?.data || error);
      throw new Error("Không thể tải danh sách báo cáo.");
    }
  },

  /**
   * Lấy chi tiết một báo cáo theo ID.
   * @param {string} id - ID của báo cáo.
   * @returns {Promise<Object>} - Dữ liệu chi tiết báo cáo.
   */
  getReportById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${API_NAME}/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching report by ID (${id}):`,
        error.response?.data || error
      );
      throw new Error("Không thể tải thông tin báo cáo.");
    }
  },

  /**
   * Tạo mới một báo cáo.
   * @param {object} data - Dữ liệu báo cáo cần tạo.
   * @returns {Promise<Object>} - Dữ liệu báo cáo vừa tạo.
   */
  createReport: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${API_NAME}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating report:", error.response?.data || error);
      throw new Error("Không thể tạo báo cáo.");
    }
  },

  /**
   * Cập nhật một báo cáo theo ID.
   * @param {string} id - ID của báo cáo.
   * @param {object} data - Dữ liệu cập nhật cho báo cáo.
   * @returns {Promise<Object>} - Dữ liệu báo cáo đã cập nhật.
   */
  updateReport: async (id, data) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${API_NAME}/${id}`,
        data
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

  /**
   * Xóa một báo cáo theo ID.
   * @param {string} id - ID của báo cáo cần xóa.
   * @returns {Promise<void>} - Xác nhận xóa thành công.
   */
  deleteReport: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${API_NAME}/${id}`);
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
