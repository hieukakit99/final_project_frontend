import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./requests-employee-edit.module.scss";
import requestEmployeeApi from "../../../api//requestEmployeeApi";

const RequestsEmployeeEdit = () => {
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

  // Fetch request data from API when component mounts or id changes
  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const request = await requestEmployeeApi.getRequestById(id);
        setFormData({
          id: request.id || "",
          title: request.title || "",
          type: request.type || "Đánh giá",
          createdAt: request.createdAt || "",
          status: request.status || "Đang chờ duyệt",
          reason: request.reason || "",
          file: request.file || "",
        });
      } catch (err) {
        setError("Không thể tải thông tin request.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
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
      await requestEmployeeApi.updateRequest(id, formData);
      alert("Cập nhật request thành công!");
      navigate("/employee-requests");
    } catch (err) {
      alert("Cập nhật request thất bại.");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.btnBack}>
        <Link to="/employee-requests">
          <button>Back</button>
        </Link>
      </div>
      <div className={styles.editContainer}>
        <h2>Sửa Request</h2>
        <form onSubmit={handleSubmit}>
          {/* Request Code */}
          <div className={styles.formGroup}>
            <label>Mã Request:</label>
            <input
              type="text"
              value={formData.id}
              className={styles.input}
              disabled
            />
          </div>

          {/* Request Title */}
          <div className={styles.formGroup}>
            <label>Tiêu đề Request:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Request Type, Created Date, and Status */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Loại Request:</label>
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

          {/* Request Content */}
          <div className={styles.formGroup}>
            <label>Nội dung Request:</label>
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

export default RequestsEmployeeEdit;
