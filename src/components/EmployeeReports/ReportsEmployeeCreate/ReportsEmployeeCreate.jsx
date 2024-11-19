import React from "react";
import styles from "./reports-employee-create.module.scss";
import { Link } from "react-router-dom";

const ReportsEmployeeCreate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Báo cáo đã được lưu!");
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
            <input type="text" placeholder="Nhập mã báo cáo" />
          </div>

          <div className={styles.formGroup}>
            <label>Tiêu đề báo cáo:</label>
            <input type="text" placeholder="Nhập tiêu đề báo cáo" />
          </div>

          <div className={styles.formGroup}>
            <label>Loại báo cáo:</label>
            <select defaultValue="">
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
            <input type="text" placeholder="Nhập tên người tạo" />
          </div>

          <div className={styles.formGroup}>
            <label>Trạng thái:</label>
            <select defaultValue="Unfinished">
              <option value="Unfinished">Chưa xong</option>
              <option value="In Progress">Đang hoàn thành</option>
              <option value="Complete">Hoàn thành</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Nội dung báo cáo:</label>
            <textarea placeholder="Nhập nội dung báo cáo"></textarea>
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
