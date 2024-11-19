import React, { useState } from "react";
import styles from "./reports-employee-create.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // You'll need to install axios

const ReportsEmployeeCreate = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    type: "",
    creator: "",
    status: "Unfinished",
    reason: "",
  });

  const navigate = useNavigate(); // to navigate after saving

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-mockapi-url.com/reports", // Replace with your mockapi URL
        formData
      );
      alert("Báo cáo đã được lưu!");
      navigate.push("/employee-reports"); // Redirect to the reports page after success
    } catch (err) {
      console.error(err);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <>
      <div className={styles.btnBack}>
        <Link to="/employee-reports">
          <button>Back</button>
        </Link>
      </div>
      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2>Thêm Báo Cáo Nhân Sự</h2>

          <div className={styles.formGroup}>
            <label>Mã báo cáo:</label>
            <input
              type="text"
              placeholder="Nhập mã báo cáo"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tiêu đề báo cáo:</label>
            <input
              type="text"
              placeholder="Nhập tiêu đề báo cáo"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Loại báo cáo:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="" disabled hidden>
                Chọn loại báo cáo
              </option>
              <option value="evaluation">Đánh giá</option>
              <option value="recruitment">Tuyển dụng</option>
              <option value="training">Đào tạo</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Người tạo:</label>
            <input
              type="text"
              placeholder="Nhập tên người tạo"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Trạng thái:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Unfinished">Chưa xong</option>
              <option value="In Progress">Đang hoàn thành</option>
              <option value="Complete">Hoàn thành</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Nội dung báo cáo:</label>
            <textarea
              placeholder="Nhập nội dung báo cáo"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Lưu báo cáo
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportsEmployeeCreate;
