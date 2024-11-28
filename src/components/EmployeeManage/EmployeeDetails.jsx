import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeImage from "./EmployeeImage";
import api from "../../api/apiClient";
import style from "./employee-details.module.scss"; // Import file SCSS module

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/v1/employee-profiles/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.imageSection}>
          <EmployeeImage imageUrl={employee.avatar} name={employee.name} />
        </div>
        <div className={style.infoSection}>
          <h2>Thông tin nhân viên</h2>
          <div className={style.formGroup}>
            <label className={style.label}>ID:</label>
            <input
              className={style.input}
              type="text"
              value={employee.userId}
              readOnly
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label}>Tên nhân viên:</label>
            <input
              className={style.input}
              type="text"
              value={employee.userName}
              readOnly
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label}>Ngày tuyển dụng:</label>
            <input
              className={style.input}
              type="text"
              value={employee.hireDate}
              readOnly
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label}>Tên công việc:</label>
            <input
              className={style.input}
              type="text"
              value={employee.jobTitle}
              readOnly
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label}>Trạng thái:</label>
            <input
              className={style.input}
              type="text"
              value={employee.status}
              readOnly
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.label}>Phòng ban:</label>
            <input
              className={style.input}
              type="text"
              value={employee.departmentName}
              readOnly
            />
          </div>
          <div className={style.buttonGroup}>
            <button
              className={`${style.button} ${style.deleteButton}`}
              onClick={() => console.log("Delete action")}
            >
              Xóa nhân viên
            </button>
            <button
              className={`${style.button} ${style.editButton}`}
              onClick={() => navigate(`/edit-employee/${id}`)}
            >
              Chỉnh sửa thông tin nhân viên
            </button>
            <button
              className={`${style.button} ${style.backButton}`}
              onClick={() => navigate(`/employee-profile`)}
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
