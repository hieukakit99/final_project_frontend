import React, { useState, useEffect, useMemo } from "react";
import style from "./recuitment-list.module.scss";
import { Modal, Pagination } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

const departments = [
  { value: "vti", label: "VTI Group" },
  { value: "fsoft", label: "FPT Software" },
  { value: "cmc", label: "CMC Corporation" },
  { value: "rikkesoft", label: "RikkeSoft" },
];

const pageSizes = [5, 10, 15, 20];

const renderDepartment = (value) => {
  const department = departments.find((item) => item.value === value);
  return department ? department.label : "Unknown";
};

const RecruitmentList = () => {
  const [candidateList, setCandidateList] = useState([
    {
      id: "example",
      department: "vti",
      name: "Nguyễn Văn A",
      birth: "1995-05-10",
      points: 90,
      interview: "Đã hoàn thành",
      status: "Được chấp nhận",
    },
    // Thêm nhiều ứng viên khác tại đây nếu cần
  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch candidate list from API
  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:3000/candidates");
      if (!response.ok) throw new Error("Failed to fetch candidates");
      const data = await response.json();
      setCandidateList(data.reverse());
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Delete a candidate
  const deleteCandidate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/candidates/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete candidate");
      await fetchCandidates(); // Refresh list after deletion
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  // Filter candidates based on search term
  const filteredCandidates = useMemo(() => {
    if (!searchTerm) return candidateList;
    return candidateList.filter((candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, candidateList]);

  // Calculate page count
  const pageCount = useMemo(() => {
    return Math.ceil(filteredCandidates.length / pageSize);
  }, [filteredCandidates, pageSize]);

  // Calculate range of candidates for the current page
  const currentCandidates = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredCandidates.slice(start, end);
  }, [filteredCandidates, currentPage, pageSize]);

  // Fetch data on component mount
  useEffect(() => {
    fetchCandidates();
  }, []);
  useEffect(() => {
    const fetchWithExample = async () => {
      try {
        const response = await fetch("http://localhost:3000/candidates");
        if (!response.ok) throw new Error("Failed to fetch candidates");
        const data = await response.json();
        const exampleCandidate = {
          id: "example",
          department: "vti",
          name: "Nguyễn Văn A",
          birth: "1995-05-10",
          points: 90,
          interview: "Đã hoàn thành",
          status: "Được chấp nhận",
        };
        setCandidateList([exampleCandidate, ...data.reverse()]);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchWithExample();
  }, []);

  return (
    <>
      <div className={style.list__container}>
        <div className={style.list__wrapper}>
          <div className={style.list__header}>
            <h3>Quản lý tuyển dụng</h3>
            <div className={style.search__container}>
              <input
                type="text"
                placeholder="Tìm kiếm ứng viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.search__input}
                aria-label="Search candidates"
              />
            </div>
          </div>
          <div>
            <table className={style.list__table}>
              <thead>
                <tr>
                  <th>Phòng ban</th>
                  <th>Tên</th>
                  <th>Ngày sinh</th>
                  <th>Điểm</th>
                  <th>Phỏng vấn</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentCandidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{renderDepartment(candidate.department)}</td>
                    <td>{candidate.name}</td>
                    <td>{moment(candidate.birth).format("DD/MM/YYYY")}</td>
                    <td>{candidate.points}</td>
                    <td>{candidate.interview}</td>
                    <td>{candidate.status}</td>
                    <td className={style.list__action}>
                      <Link
                        to={`/recruitments/${candidate.id}`}
                        className={style.list__btn__edit}
                        aria-label="Edit candidate"
                      />
                      <button
                        className={style.list__btn__delete}
                        onClick={() => {
                          setShowModal(true);
                          setSelectedCandidate(candidate);
                        }}
                        aria-label="Delete candidate"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={style.pagination}>
          <div className={`${style.page_size} d-inline-flex column-gap-2`}>
            <p className="m-0">Hiển thị mỗi trang: </p>
            <select
              name="pageSize"
              id="pageSize"
              onChange={(e) => setPageSize(Number(e.target.value))}
              value={pageSize}
              aria-label="Select page size"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <Pagination className="m-0">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      {showModal && (
        <Modal show={showModal} centered>
          <Modal.Header className="justify-content-center">
            <Modal.Title className={style.btn__popup__modalTitle}>
              Xác nhận xóa
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
                    if (selectedCandidate) {
                      deleteCandidate(selectedCandidate.id);
                      setSelectedCandidate(null);
                    }
                  }}
                >
                  Xóa
                </button>
                <button
                  className={style.btn__popup__cancel}
                  onClick={() => {
                    setShowModal(false);
                    setSelectedCandidate(null);
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default RecruitmentList;
