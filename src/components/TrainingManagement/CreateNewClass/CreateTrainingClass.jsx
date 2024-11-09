import React, { useState } from "react";
import style from "./create-training-class.module.scss";
import { Link } from "react-router-dom";

const CreateTrainingClass = () => {
  const [className, setClassName] = useState("Java");
  const [tutor, setTutor] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [candidate, setCandidate] = useState(0);
  const [status, setStatus] = useState("Unstarted");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCandidate = () => {
    setCandidate(candidate + 1);
  };

  const handleSave = () => {
    // Xử lý lưu thông tin lớp học
    console.log({
      className,
      tutor,
      dateStart,
      candidate,
      status,
    });
  };

  return (
    <>
      <div className={style.btn__back}>
        <Link to="/training">
          <button>Back</button>
        </Link>
      </div>

      <div className={style.list__container}>
        <h2 className={style.list__title}>Create new class</h2>

        <div className={style.form__wrapper}>
          <div className={style.form__left}>
            <div className={style.form__input}>
              <label>Class Name</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <div className={style.form__input}>
              <label>Tutor</label>
              <input
                type="text"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                placeholder="Enter tutor name"
              />
            </div>

            <div className={style.form__input}>
              <label>Date Start</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>

            <div className={style.form__input}>
              <label>Candidate</label>
              <div className={style.candidate__input}>
                <input type="number" value={candidate} readOnly />
                <button
                  onClick={handleAddCandidate}
                  className={style.candidate__btn}
                >
                  +
                </button>
              </div>
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
