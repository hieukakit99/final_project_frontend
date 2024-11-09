import { Link } from "react-router-dom";
import style from "./recruitment-edit.module.scss";
import React, { useState } from "react";

const RecruitmentEdit = () => {
  const [formData, setFormData] = useState({
    department: "Java",
    name: "Nguyen Van A",
    birth: "2000-05-19",
    dateInterview: "2024-10-24",
    points: 4.72,
    interview: 5.24,
    status: "Fail",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
  };

  return (
    <>
      <div className={style.recruitment__back}>
        <Link to="/recruitment">
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
            {/* Add more options if needed */}
          </select>
        </div>

        <button className={style.recruitment__button} onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};
export default RecruitmentEdit;
