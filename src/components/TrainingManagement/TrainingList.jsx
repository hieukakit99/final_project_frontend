import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Pagination } from "react-bootstrap";
import moment from "moment";
import { trainingApi } from "../../api/traningApi"; // Import the API module
import style from "./training-list.module.scss";

const TrainingList = () => {
  const [classList, setClassList] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [show, setShow] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Pagination helpers
  const pageCounts = Array.from(
    { length: Math.ceil(filteredClasses.length / pageSize) },
    (_, i) => i + 1
  );

  // Fetch training classes from MockAPI
  const fetchTrainings = async () => {
    try {
      const data = await trainingApi.getTrainings();
      setClassList(data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  // Delete a training class
  const deleteTraining = async (id) => {
    try {
      await trainingApi.deleteTraining(id);
      await fetchTrainings(); // Refresh the list after deletion
      setCurrentPage(1);
      setShow(false);
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  // Handle search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Update filtered classes when search term or class list changes
  useEffect(() => {
    const filtered = searchTerm
      ? classList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : classList;
    setFilteredClasses(filtered);
  }, [searchTerm, classList]);

  // Fetch classes on component mount
  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div className={style.list__container}>
      <div className={style.list__wrapper}>
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
              <th>Start Date</th>
              <th>Candidate Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((training) => (
                <tr key={training.id}>
                  <td>{training.name}</td>
                  <td>{training.tutor}</td>
                  <td>{moment(training.dateStart).format("DD/MM/YYYY")}</td>
                  <td>{training.candidateCount}</td>
                  <td>{training.status}</td>
                  <td className={style.list__actions}>
                    <Link
                      to={`/trainings/${training.id}`}
                      className={style.editBtn}
                    ></Link>
                    <button
                      className={style.deleteBtn}
                      onClick={() => {
                        setSelectedTraining(training);
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
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
            {pageCounts.map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                currentPage < pageCounts.length &&
                setCurrentPage(currentPage + 1)
              }
            />
          </Pagination>
        </div>
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
                    deleteTraining(selectedTraining?.id);
                    setSelectedTraining(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className={style.btn__popup__cancel}
                  onClick={() => {
                    setShow(false);
                    setSelectedTraining(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>{" "}
        <Link to="/trainings/create">
          <button className={style.createNewClassBtn}>Create New Class</button>
        </Link>
      </div>
    </div>
  );
};

export default TrainingList;
