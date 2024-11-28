import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import style from "./edit-class.module.scss";
import { trainingApi } from "../../../api/traningApi";

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [className, setClassName] = useState("");
  const [tutor, setTutor] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [candidate, setCandidate] = useState(0);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const training = await trainingApi.getTrainingById(id);
        setClassName(training.name);
        setTutor(training.tutor);
        setDateStart(training.dateStart);
        setCandidate(training.candidateCount);
        setStatus(training.status);
      } catch (error) {
        console.error("Failed to fetch training details:", error);
      }
    };

    fetchClass();
  }, [id]);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!className) newErrors.className = "Hãy chọn tên lớp";
    if (!tutor) newErrors.tutor = "Nhập tên giảng viên";
    if (!dateStart) newErrors.dateStart = "Nhập ngày bắt đầu";
    if (new Date(dateStart) < new Date())
      newErrors.dateStart = "Ngày bắt đầu không được ở quá khứ";
    if (candidate <= 0)
      newErrors.candidate = "Candidate count must be a positive number.";
    if (!status) newErrors.status = "Hãy chọn trạng thái";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = async () => {
    if (!validate()) return; // If validation fails, stop the save process

    try {
      const updatedTraining = {
        name: className,
        tutor,
        dateStart,
        candidateCount: candidate,
        status,
      };

      await trainingApi.updateTraining(id, updatedTraining);
      alert("Class updated successfully!");
      navigate("/trainings");
    } catch (error) {
      console.error("Failed to update training:", error);
      alert("Failed to update class. Please try again.");
    }
  };

  return (
    <>
      <div className={style.btn__back}>
        <Link to="/trainings">
          <button>Back</button>
        </Link>
      </div>

      <div className={style.list__container}>
        <h2 className={style.list__title}>Edit Class</h2>

        <div className={style.form__wrapper}>
          <div className={style.form__left}>
            <div className={style.form__input}>
              <label>Class Name</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                <option value="">Chọn tên lớp</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
              </select>
              {errors.className && (
                <span className={style.error}>{errors.className}</span>
              )}
            </div>

            <div className={style.form__input}>
              <label>Tutor</label>
              <input
                type="text"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                placeholder="Enter tutor name"
              />
              {errors.tutor && (
                <span className={style.error}>{errors.tutor}</span>
              )}
            </div>

            <div className={style.form__input}>
              <label>Date Start</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
              {errors.dateStart && (
                <span className={style.error}>{errors.dateStart}</span>
              )}
            </div>

            <div className={style.form__input}>
              <label>Candidate</label>
              <div className={style.candidate__input}>
                <input
                  type="number"
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                />
                <button className={style.candidate__btn}>-</button>
              </div>
              {errors.candidate && (
                <span className={style.error}>{errors.candidate}</span>
              )}
            </div>

            <div className={style.form__input}>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="Unstarted">Unstarted</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
              {errors.status && (
                <span className={style.error}>{errors.status}</span>
              )}
            </div>
          </div>
          <div className={style.candidate__container}>
            <h3>Danh sách ứng viên</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search"
              className={style.search_input}
            />
            <ul className={style.candidate__list}>
              {[...Array(5)].map((_, index) => (
                <li key={index} className={style.candidate__item}>
                  <div className={style.candidate__info}>
                    <img
                      src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                      alt=""
                    />
                    <div className={style.info_text}>
                      <span>Tên ứng viên</span>
                      <span>Ngày Sinh</span>
                    </div>
                  </div>
                  <button className={style.candidate__listBtn}>-</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button onClick={handleSave} className={style.save_btn}>
        Save
      </button>
    </>
  );
};

export default EditClass;
