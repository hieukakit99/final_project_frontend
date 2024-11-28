import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiClient"; // Assuming apiClient is set up properly
import styles from "./AddEmployee.module.scss"; // Assuming SCSS module is used

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    userName: "",
    hireDate: "",
    jobTitle: "",
    status: "",
    address: "",
    departmentName: "",
    avatar: "", // URL image
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "http://localhost:8080/api/v1/employee-profiles",
        employee
      );
      alert("Nhân viên đã được thêm thành công!");
      navigate("/employee-profile"); // Navigate to the employee profile page after success
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
      alert("Đã xảy ra lỗi khi thêm nhân viên.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Thêm Nhân Viên Mới</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Họ và Tên</label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              name="userName"
              value={employee.userName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>ID</label>
            <input
              type="number"
              placeholder="Nhập mã ứng viên"
              name="address"
              value={employee.address}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Tên công việc</label>
            <input
              type="text"
              name="jobTitle"
              value={employee.jobTitle}
              placeholder="Nhập tên công việc"
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Trạng thái</label>
            <input
              type="text"
              placeholder="Nhập trạng thái"
              name="status"
              value={employee.status}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Ngày tuyển dụng</label>
            <input
              type="date"
              placeholder="Nhập ngày tuyển dụng"
              name="hireDate"
              value={employee.hireDate}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label className={styles.label}>Phòng ban</label>
            <input
              type="text"
              placeholder="Nhập phòng ban"
              name="departmentName"
              value={employee.departmentName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label}>Ảnh đại diện (URL)</label>
            <input
              type="text"
              placeholder="Nhập URL ảnh đại diện"
              name="avatar"
              value={employee.avatar}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>
            Lưu Nhân Viên
          </button>
          <button
            type="button"
            onClick={() => navigate("/employee-profile")}
            className={styles.cancelButton}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
