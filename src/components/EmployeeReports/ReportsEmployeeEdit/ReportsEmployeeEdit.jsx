import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./reports-employee-edit.module.scss";
import reportEmployeeApi from "../../../api/reportEmployeeApi";

const ReportsEmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    type: "Đánh giá",
    createdAt: "",
    status: "Đang chờ duyệt",
    reason: "",
    file: "",
  }); // Initialize the form data state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch report data from API when component mounts or id changes
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const report = await reportEmployeeApi.getReportById(id);
        setFormData({
          id: report.id || "",
          title: report.title || "",
          type: report.type || "Đánh giá",
          createdAt: report.createdAt || "",
          status: report.status || "Đang chờ duyệt",
          reason: report.reason || "",
          file: report.file || "",
        });
      } catch (err) {
        setError("Không thể tải thông tin báo cáo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportEmployeeApi.updateReport(id, formData);
      alert("Cập nhật báo cáo thành công!");
      navigate("/employee-reports");
    } catch (err) {
      alert("Cập nhật báo cáo thất bại.");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.btnBack}>
        <Link to="/employee-reports">
          <button>Back</button>
        </Link>
      </div>
      <div className={styles.editContainer}>
        <h2>Sửa Báo Cáo</h2>
        <form onSubmit={handleSubmit}>
          {/* Report Code */}
          <div className={styles.formGroup}>
            <label>Mã báo cáo:</label>
            <input
              type="text"
              value={formData.id}
              className={styles.input}
              disabled
            />
          </div>

          {/* Report Title */}
          <div className={styles.formGroup}>
            <label>Tiêu đề báo cáo:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Report Type, Created Date, and Status */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Loại báo cáo:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Đánh giá">Đánh giá</option>
                <option value="Tuyển dụng">Tuyển dụng</option>
                <option value="Đào tạo">Đào tạo</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Ngày tạo:</label>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Trạng thái:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Đang chờ duyệt">Đang chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Từ chối">Từ chối</option>
              </select>
            </div>
          </div>

          {/* Report Content */}
          <div className={styles.formGroup}>
            <label>Nội dung báo cáo:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>

          {/* File Upload */}
          <div className={styles.formGroup}>
            <label>File đính kèm:</label>
            <div className={styles.fileUpload}>
              <input
                type="text"
                placeholder="Chọn file"
                name="file"
                value={formData.file}
                readOnly
                className={styles.fileInput}
              />
              <button type="button" className={styles.uploadButton}>
                Tải lên
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportsEmployeeEdit;
