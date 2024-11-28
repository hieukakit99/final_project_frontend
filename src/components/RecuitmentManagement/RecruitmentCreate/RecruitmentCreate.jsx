import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./recruitment-create.module.scss";
import { recruitmentApi } from "../../../api/recruitmentApi";

const RecruitmentCreate = () => {
  const navigate = useNavigate(); // Điều hướng sau khi lưu

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    birth: "",
    dateInterview: "",
    points: "",
    interview: "",
    status: "",
  });

  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(""); // Lưu lỗi nếu có

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xác thực
  const validateForm = () => {
    if (!formData.department) return "Hãy điền thông tin phòng ban.";
    if (!formData.name) return "Hãy điền thông tin hộ và tên.";
    if (!formData.birth) return "Hãy điền thông tin ngày sinh.";
    if (!formData.points) return "Hãy điền thông tin điểm số.";
    if (!formData.phone) return "Hãy điền số điện thoại.";
    if (!formData.status) return "Hãy chọn trạng thái.";
    if (!formData.dateInterview) return "Hãy nhập ngày phỏng vấn";
    return ""; // Không có lỗi
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true); // Bắt đầu tải
    setError(""); // Xóa lỗi trước đó

    try {
      await recruitmentApi.createCandidate(formData); // Gọi API
      navigate("/recruitments"); // Quay lại danh sách ứng viên
    } catch (apiError) {
      setError("Không tạo được lớp mới. Hãy thử lại.");
      console.error("Error creating candidate:", apiError);
    } finally {
      setLoading(false); // Dừng tải
    }
  };

  return (
    <>
      <div className={style.recruitment__back}>
        <button onClick={() => navigate("/recruitments")}>Back</button>
      </div>

      <div className={style.recruitment__edit}>
        <h2>Create Recruitment</h2>
        {error && <p className={style.recruitment__error}>{error}</p>}{" "}
        {/* Hiển thị lỗi */}
        <div className={style.recruitment__form}>
          <label>Phòng ban</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Chọn phòng ban</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>
        <div className={style.recruitment__form}>
          <label>Họ và Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Điền họ và tên"
          />
        </div>
        <div className={style.recruitment__form}>
          <label>Ngày Sinh</label>
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </div>
        <div className={style.recruitment__form}>
          <label>Ngày phỏng vấn</label>
          <input
            type="date"
            name="dateInterview"
            value={formData.dateInterview}
            onChange={handleChange}
          />
        </div>
        <div className={style.recruitment__form}>
          <label>Điểm số</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            step="0.01"
            placeholder="Điền số điểm"
          />
        </div>
        <div className={style.recruitment__form}>
          <label>Số điện thoại</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            step="0.01"
            placeholder="Điền số điện thoại"
          />
        </div>
        <div className={style.recruitment__form}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Chọn trạng thái</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>
        <button
          className={style.recruitment__button}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
};

export default RecruitmentCreate;
