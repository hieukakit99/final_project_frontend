import React, { useState, useEffect } from "react";
import style from "./training-list.module.scss";
import { Modal, Pagination } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

const tutors = [
  { value: "java", label: "Justin Herbert" },
  { value: "javascript", label: "Nelson" },
  { value: "csharp", label: "A.J. Brown" },
  { value: "php", label: "Jerry Jeudy" },
  { value: "reactjs", label: "Alvin Kamaran" },
  { value: "python", label: "Malcolm Brown" },
];

const TrainingList = () => {
  const [classList, setClassList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [show, setShow] = useState(false);
  const [candidateSelected, setCandidateSelected] = useState(null); // Added

  const handleShow = () => setShow(true);

  const fetchCandidates = async () => {
    const candidateList = await fetch(`http://localhost:3000/candidates`);
    const data = await candidateList.json();
    setClassList(data.reverse());
  };

  const deleteCandidate = async (id) => {
    await fetch(`http://localhost:3000/candidates/${id}`, {
      method: "DELETE",
    });
    await fetchCandidates();
    setCurrentPage(1);
    setShow(false);
  };

  const pageCounts = Array.from(
    { length: Math.ceil(filteredClasses.length / pageSize) },
    (_, i) => i + 1
  );

  const fetchClasses = async () => {
    const data = [
      {
        id: 1,
        name: "Java",
        tutor: "Justin Herbert",
        dateStart: "2024-10-25",
        candidateCount: 15,
        status: "Unstarted",
      },
      {
        id: 2,
        name: "JavaScript",
        tutor: "Nelson",
        dateStart: "2024-10-26",
        candidateCount: 17,
        status: "In Progress",
      },
      {
        id: 3,
        name: "C#",
        tutor: "A.J. Brown",
        dateStart: "2024-10-27",
        candidateCount: 16,
        status: "In Progress",
      },
      {
        id: 4,
        name: "PHP",
        tutor: "Jerry Jeudy",
        dateStart: "2024-10-28",
        candidateCount: 18,
        status: "Complete",
      },
      {
        id: 5,
        name: "ReactJs",
        tutor: "Alvin Kamaran",
        dateStart: "2024-10-29",
        candidateCount: 12,
        status: "Complete",
      },
      {
        id: 6,
        name: "Python",
        tutor: "Malcolm Brown",
        dateStart: "2024-10-30",
        candidateCount: 14,
        status: "Complete",
      },
    ];
    setClassList(data);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = classList.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classList);
    }
  }, [searchTerm, classList]);

  return (
    <>
      <div className={style.list__container}>
        <div className={style.list__header}>
          <h3>Quản lý đào tạo</h3>
          <div className={style.searchContainer}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className={style.searchInput}
            />
          </div>
        </div>
        <table className={style.list__table}>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Tutor</th>
              <th>Date Start</th>
              <th>Candidate</th>
              <th>Status</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.tutor}</td>
                  <td>{moment(item.dateStart).format("DD/MM/YYYY")}</td>
                  <td>{item.candidateCount}</td>
                  <td>{item.status}</td>
                  <td className={style.list__actions}>
                    <Link
                      to={`/training/${item.id}`}
                      className={style.editBtn}
                    ></Link>
                    <button
                      className={style.deleteBtn}
                      onClick={() => {
                        setCandidateSelected(item);
                        setShow(true);
                      }}
                    ></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className={style.pagination}>
          <Pagination>
            <Pagination.Prev
              onClick={() =>
                currentPage > 1 && handleCurrentPage(currentPage - 1)
              }
            />
            {pageCounts.map((item) => (
              <Pagination.Item
                key={item}
                active={item === currentPage}
                onClick={() => handleCurrentPage(item)}
              >
                {item}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                currentPage < pageCounts.length &&
                handleCurrentPage(currentPage + 1)
              }
            />
          </Pagination>
          <Modal show={show} centered>
            <Modal.Header className="justify-content-center">
              <Modal.Title className={style.btn__popup__modalTitle}>
                Delete Confirm
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column align-items-center">
                <p className={style.btn__popup__confirmText}>
                  Bạn có chắc muốn xóa?
                </p>
                <div className={style.btn__popup__buttonContainer}>
                  <button
                    className={style.btn__popup__delete}
                    onClick={() => {
                      deleteCandidate(candidateSelected?.id);
                      setCandidateSelected(null);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={style.btn__popup__cancel}
                    onClick={() => {
                      setShow(false);
                      setCandidateSelected(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <Link to="/training/create">
          <button className={style.createNewClassBtn}>Create new class</button>
        </Link>
      </div>
    </>
  );
};

export default TrainingList;
