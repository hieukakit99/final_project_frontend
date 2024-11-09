import React, { useState } from "react";
import styles from "./update-employee.module.scss";

const UpdateEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    department: "",
    position: "",
    skill: "",
    createDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý khi nhấn nút Update
    console.log("Updated Data:", formData);
  };

  return (
    <div className={styles["update-employee-container"]}>
      <h2>UpDate Thông Tin Nhân Viên</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label>FullName</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles["form-group"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles["form-group"]}>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles["form-group"]}>
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          >
            <option value="">Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label>Position</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          >
            <option value="">Position</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label>Skill</label>
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles["form-group"]}>
          <label>CreateDate</label>
          <input
            type="date"
            name="createDate"
            value={formData.createDate}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className={styles["update-button"]}>
          UpDate
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
