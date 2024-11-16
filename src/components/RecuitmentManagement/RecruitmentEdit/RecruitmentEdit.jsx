import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import style from "./recruitment-edit.module.scss";
import { recruitmentApi } from "../../../api/recruitmentApi";

const RecruitmentEdit = () => {
  const { id } = useParams(); // Get candidate ID from the URL
  const history = useNavigate(); // For navigation after save

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    birth: "",
    dateInterview: "",
    points: 0,
    interview: 0,
    status: "",
  });

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
          interview: candidate.interview,
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

  const handleSave = async () => {
    try {
      await recruitmentApi.updateCandidate(id, formData);
      console.log("Saved data:", formData);
      history.push("/recruitments"); // Navigate back to recruitment list after saving
    } catch (error) {
      console.error("Error saving candidate data:", error);
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
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            {/* Add more options if needed */}
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
