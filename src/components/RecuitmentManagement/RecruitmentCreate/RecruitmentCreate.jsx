import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./recruitment-create.module.scss";
import { recruitmentApi } from "../../../api/recruitmentApi";

const RecruitmentCreate = () => {
  const history = useNavigate(); // Điều hướng sau khi lưu

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    birth: "",
    dateInterview: "",
    points: 0,
    interview: 0,
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Tạo ứng viên mới
      await recruitmentApi.createCandidate(formData);
      history("/recruitments"); // Quay lại danh sách ứng viên
    } catch (error) {
      console.error("Error creating candidate:", error);
    }
  };

  return (
    <>
      <div className={style.recruitment__back}>
        <button onClick={() => history("/recruitments")}>Back</button>
      </div>

      <div className={style.recruitment__edit}>
        <h2>Create Recruitment</h2>
        <div className={style.recruitment__form}>
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>

        <div className={style.recruitment__form}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={style.recruitment__form}>
          <label>Birth</label>
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
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
        </div>

        <div className={style.recruitment__form}>
          <label>Interview</label>
          <input
            type="number"
            name="interview"
            value={formData.interview}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className={style.recruitment__form}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>

        <button className={style.recruitment__button} onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default RecruitmentCreate;
