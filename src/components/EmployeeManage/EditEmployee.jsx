import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/apiClient";
import style from "./edit-emplouee.module.scss";

const EditEmployee = () => {
  const { id } = useParams(); // Lấy ID nhân viên từ URL
  const [employee, setEmployee] = useState(null); // Trạng thái để lưu thông tin nhân viên
  const [avatar, setAvatar] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
  ); // Trạng thái để lưu ảnh đại diện
  const navigate = useNavigate();

  // Lấy thông tin nhân viên từ API
  useEffect(() => {
    api
      .get(`http://localhost:8080/api/v1/employee-profiles/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setAvatar(response.data.avatar); // Cập nhật ảnh đại diện
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>; // Hiển thị trạng thái loading khi chưa có dữ liệu
  }

  const handleSave = () => {
    const updatedEmployee = { ...employee, avatar }; // Dữ liệu được cập nhật
    api
      .put(
        `http://localhost:8080/api/v1/employee-profiles/${id}`,
        updatedEmployee
      )
      .then(() => {
        alert("Thông tin nhân viên đã được cập nhật!");
        navigate(`/employee-details/${id}`); // Chuyển về trang chi tiết nhân viên
      })
      .catch((error) => console.error("Error saving employee details:", error));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh mới
  };

  return (
    <div className={style.editEmployee}>
      <h2 className={style.editEmployee__title}>
        Chỉnh sửa thông tin nhân viên
      </h2>
      <div className={style.editEmployee__container}>
        <div className={style.editEmployee__avatar}>
          <img
            src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            alt="Avatar"
            className={style.editEmployee__avatarImage}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={style.editEmployee__fileInput}
          />
        </div>
        <div className={style.editEmployee__form}>
          <div className={style.editEmployee__formGroup}>
            <label>ID:</label>
            <input
              type="text"
              value={employee.userId}
              readOnly
              className={style.editEmployee__fileInput}
            />
          </div>

          <div className={style.editEmployee__formGroup}>
            <label>Họ và Tên:</label>
            <input
              type="text"
              value={employee.userName}
              onChange={(e) =>
                setEmployee({ ...employee, userName: e.target.value })
              }
              className={style.editEmployee__fileInput}
            />
          </div>

          <div className={style.editEmployee__formGroup}>
            <label>Ngày tuyển dụng:</label>
            <input
              type="date"
              value={employee.hireDate}
              onChange={(e) =>
                setEmployee({ ...employee, birthDate: e.target.value })
              }
              className={style.editEmployee__fileInput}
            />
          </div>

          <div className={style.editEmployee__formGroup}>
            <label>Tên công việc:</label>
            <input
              type="text"
              value={employee.jobTitle}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              className={style.editEmployee__fileInput}
            />
          </div>

          <div className={style.editEmployee__formGroup}>
            <label>Trạng thái:</label>
            <input
              type="text"
              value={employee.status}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
              className={style.editEmployee__fileInput}
            />
          </div>

          <div className={style.editEmployee__formGroup}>
            <label>Phòng ban:</label>
            <input
              type="text"
              value={employee.departmentName}
              onChange={(e) =>
                setEmployee({ ...employee, departmentName: e.target.value })
              }
              className={style.editEmployee__fileInput}
            />
          </div>

          <div className={style.editEmployee__buttons}>
            <button
              onClick={handleSave}
              className={style.editEmployee__buttonSave}
            >
              Lưu thông tin
            </button>
            <button
              onClick={() => navigate(`/employee-details/${id}`)}
              className={style.editEmployee__buttonCancel}
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
