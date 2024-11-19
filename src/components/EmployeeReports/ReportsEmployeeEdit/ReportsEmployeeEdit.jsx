import React, { useState } from "react";
import styles from "./reports-employee-edit.module.scss";
import { Link } from "react-router-dom";

const ReportsEmployeeEdit = () => {
  const [formData, setFormData] = useState({
    reportCode: "BC001",
    title: "Báo cáo nhân sự Quý 1/2024",
    type: "Báo cáo quý",
    createdDate: "01/04/2024",
    status: "Đã duyệt",
    content: "",
    file: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

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
          <div className={styles.formGroup}>
            <label>Mã báo cáo:</label>
            <input
              type="text"
              value={formData.reportCode}
              readOnly
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tiêu đề báo cáo:</label>
            <input
              type="text"
              value={formData.title}
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Loại báo cáo:</label>
              <select value={formData.type} className={styles.select}>
                <option value="Báo cáo quý">Báo cáo quý</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Ngày tạo:</label>
              <input
                type="text"
                value={formData.createdDate}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Trạng thái:</label>
              <select value={formData.status} className={styles.select}>
                <option value="Đã duyệt">Đã duyệt</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Nội dung báo cáo:</label>
            <textarea value={formData.content} className={styles.textarea} />
          </div>

          <div className={styles.formGroup}>
            <label>File đính kèm:</label>
            <div className={styles.fileUpload}>
              <input
                type="text"
                placeholder="Chọn file"
                value={formData.file}
                readOnly
                className={styles.fileInput}
              />
              <button type="button" className={styles.uploadButton}>
                Tải lên
              </button>
            </div>
          </div>

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
