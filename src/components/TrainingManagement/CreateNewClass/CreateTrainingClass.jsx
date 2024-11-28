import React, { useState } from "react";
import style from "./create-training-class.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { trainingApi } from "../../../api/traningApi"; // Import the API module

const CreateTrainingClass = () => {
  const [className, setClassName] = useState("default");
  const [tutor, setTutor] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [candidateCount, setCandidateCount] = useState(0);
  const [status, setStatus] = useState("Unstarted");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessages, setErrorMessages] = useState([]); // State for error messages
  const navigate = useNavigate(); // For navigation

  const validate = () => {
    const errors = [];
    if (!className || className === "default") {
      errors.push("Hãy chọn tên lớp");
    }
    if (!tutor) {
      errors.push("Tutor is required.");
    }
    if (!dateStart) {
      errors.push("Hãy chọn ngày bắt đầu");
    } else if (new Date(dateStart) < new Date()) {
      errors.push("Ngày bắt đầu không được ở trong quá khứ");
    }
    if (candidateCount <= 0) {
      errors.push("Số lượng ứng viên phải là số dương.");
    }

    return errors;
  };

  const handleSave = async () => {
    const errors = validate(); // Get validation errors

    // If there are validation errors, set them and stop further processing
    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // If no errors, proceed to save the new class
    const newClass = {
      name: className,
      tutor: tutor,
      dateStart: dateStart,
      candidateCount: candidateCount,
      status: status,
    };

    try {
      await trainingApi.createTraining(newClass);
      alert("Class created successfully!");
      navigate("/trainings"); // Navigate back to the training list
    } catch (error) {
      console.error("Error saving new training class:", error);
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
        <h2 className={style.list__title}>Create New Class</h2>
        <div className={style.form__wrapper}>
          <div className={style.form__left}>
            <div className={style.form__input}>
              <label>Class Name</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                <option value="default">Chọn lớp học</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
              </select>
              {errorMessages.includes("Class Name is required.") && (
                <div className={style.errorMessage}>Hãy chọn tên lớp</div>
              )}
            </div>

            <div className={style.form__input}>
              <label>Giảng viên</label>
              <input
                type="text"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                placeholder="Enter tutor name"
              />
              {errorMessages.includes("Tutor is required.") && (
                <div className={style.errorMessage}>Nhập tên giảng viên.</div>
              )}
            </div>

            <div className={style.form__input}>
              <label>Ngày bắt đầu</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
              {errorMessages.includes("Hãy chọn ngày bắt đầu.") && (
                <div className={style.errorMessage}>Hãy chọn ngày bắt đầu.</div>
              )}
              {errorMessages.includes(
                "Ngày bắt đầu không được ở trong quá khứ"
              ) && (
                <div className={style.errorMessage}>
                  Ngày bắt đầu không được ở trong quá khứ
                </div>
              )}
            </div>

            <div className={style.form__input}>
              <label>Candidate Count</label>
              <div className={style.candidate__input}>
                <input
                  type="number"
                  value={candidateCount}
                  onChange={(e) => setCandidateCount(e.target.value)}
                />
                <button className={style.candidate__btn}>+</button>
              </div>
              {errorMessages.includes(
                "Số lượng ứng viên phải là số dương."
              ) && (
                <div className={style.errorMessage}>
                  Số lượng ứng viên phải là số dương.
                </div>
              )}
            </div>

            <div className={style.form__input}>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Unstarted">Unstarted</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          </div>

          <div className={style.candidate__container}>
            <h3>Candidate List</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
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
                      <span>Candidate Name</span>
                      <span>Birthdate</span>
                    </div>
                  </div>
                  <button className={style.candidate__listBtn}>+</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={handleSave} className={style.save_btn}>
          Save
        </button>
      </div>
    </>
  );
};

export default CreateTrainingClass;
