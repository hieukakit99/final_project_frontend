import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import style from "./recruitment-edit.module.scss";
import { recruitmentApi } from "../../../api/recruitmentApi";

const RecruitmentEdit = () => {
  const { id } = useParams(); // Get candidate ID from the URL
  const navigate = useNavigate(); // For navigation after save

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    birth: "",
    dateInterview: "",
    points: 0,
    phone: 0, // Added phone field
    status: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch candidate data when component mounts or id changes
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const candidate = await recruitmentApi.getCandidateById(id);
        setFormData({
          department: candidate.department,
          name: candidate.name,
          birth: candidate.birth,
          dateInterview: candidate.dateInterview,
          points: candidate.points,
          phone: candidate.phone, // Map phone data from API response
          status: candidate.status,
        });
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    if (id) {
      fetchCandidate();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation function
  const validate = () => {
    const errors = {};

    if (!formData.department || formData.department === "default") {
      errors.department = "Hãy chọn phòng ban .";
    }
    if (!formData.name) {
      errors.name = "Điền họ và tên.";
    }
    if (!formData.birth) {
      errors.birth = "Điền ngày sinh.";
    }
    if (!formData.phone || formData.phone.toString().length < 9) {
      errors.phone = "Số điện thoại phải có ít nhất 9 chữ số.";
    }
    if (formData.points <= 0) {
      errors.points = "Điểm phải lớn hơn 0.";
    }
    if (!formData.status || formData.status === "default") {
      errors.status = "Nhập thông tin trạng thái.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        await recruitmentApi.updateCandidate(id, formData);
        console.log("Saved data:", formData);
        navigate("/recruitments"); // Navigate back to recruitment list after saving
      } catch (error) {
        console.error("Error saving candidate data:", error);
      }
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <>
      <div className={style.recruitment__back}>
        <Link to="/recruitments">
          <button>Back</button>
        </Link>
      </div>

      <div className={style.recruitment__edit}>
        <h2>Edit Recruitment</h2>

        <div className={style.recruitment__form}>
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="default">Chọn phòng ban</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
          </select>
          {errors.department && (
            <div className={style.recruitment__error}>{errors.department}</div>
          )}
        </div>

        <div className={style.recruitment__form}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className={style.recruitment__error}>{errors.name}</div>
          )}
        </div>

        <div className={style.recruitment__form}>
          <label>Birth</label>
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
          {errors.birth && (
            <div className={style.recruitment__error}>{errors.birth}</div>
          )}
        </div>

        <div className={style.recruitment__form}>
          <label>Date Interview</label>
          <input
            type="date"
            name="dateInterview"
            value={formData.dateInterview}
            onChange={handleChange}
          />
        </div>

        <div className={style.recruitment__form}>
          <label>Points</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            step="0.01"
          />
          {errors.points && (
            <div className={style.recruitment__error}>{errors.points}</div>
          )}
        </div>

        <div className={style.recruitment__form}>
          <label>Số điện thoại</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <div className={style.recruitment__error}>{errors.phone}</div>
          )}
        </div>

        <div className={style.recruitment__form}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="default">Điền trạng thái</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
          {errors.status && (
            <div className={style.recruitment__error}>{errors.status}</div>
          )}
        </div>

        <button className={style.recruitment__button} onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default RecruitmentEdit;
