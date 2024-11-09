import React, { useState, useEffect } from "react";
import style from "./recuitment-list.module.scss";
import { Modal, Pagination } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

const department = [
  { value: "vti", label: "VTI Group" },
  { value: "fsoft", label: "FPT Software" },
  { value: "cmc", label: "CMC Corporation" },
  { value: "rikkesoft", label: "RikkeSoft" },
];

const pageSizes = [{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }];

const RecruitmentList = () => {
  const [candidateList, setCandidateList] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidateSelected, setCandidateSelected] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevRange, setPrevRange] = useState(0);
  const [currRange, setCurrRange] = useState(pageSize);

  const handleShow = () => setShow(true);

  const fetchCandidates = async () => {
    const candidateList = await fetch(`http://localhost:3000/candidates`);
    const data = await candidateList.json();
    setCandidateList(data.reverse()); // Thêm ứng viên mới lên đầu danh sách
  };

  const pageCounts = Array.from({ length: pageCount }, (_, i) => i + 1);

  const deleteCandidate = async (id) => {
    await fetch(`http://localhost:3000/candidates/${id}`, {
      method: "DELETE",
    });
    await fetchCandidates();
    setCurrentPage(1); // Tải lại trang 1 sau khi xóa
    setShow(false);
  };

  const renderDepartment = (value) => {
    const departmentSelected = department.find((item) => item.value === value);
    return departmentSelected?.label;
  };

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const prevRange = (pageNumber - 1) * pageSize;
    const currRange = pageNumber * pageSize;
    setPrevRange(prevRange);
    setCurrRange(currRange);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(filteredCandidates.length / pageSize));
  }, [pageSize, filteredCandidates]);

  useEffect(() => {
    handleCurrentPage(currentPage); // Cập nhật phạm vi mỗi khi currentPage hoặc pageSize thay đổi
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = candidateList.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) // So sánh không phân biệt chữ hoa chữ thường
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidateList);
    }
  }, [searchTerm, candidateList]);

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
                onChange={handleSearch}
                className={style.search__input}
              />
            </div>
            <Link to="/recruitment/create">
              <span></span>
              <span>Thêm ứng viên mới</span>
            </Link>
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
                {/* Tài khoản ví dụ */}
                <tr key="example">
                  <td>{renderDepartment("vti")}</td>
                  <td>Nguyễn Văn A</td>
                  <td>{moment("2024-07-11").format("DD/MM/YYYY")}</td>
                  <td>6.75</td>
                  <td>7.65</td>
                  <td>Đạt</td>
                  <td className={style.list__action}>
                    <Link
                      to={`example`}
                      className={style.list__btn__edit}
                    ></Link>
                    <button
                      className={style.list__btn__delete}
                      onClick={() => {
                        handleShow();
                        setCandidateSelected({
                          id: "example",
                          name: "Nguyễn Văn A",
                        });
                      }}
                    ></button>
                  </td>
                </tr>

                {/* Tài khoản thật */}
                {filteredCandidates.slice(prevRange, currRange).map((item) => (
                  <tr key={item?.id}>
                    <td>{renderDepartment(item?.department)}</td>
                    <td>{item?.name}</td>
                    <td>{moment(item?.birth).format("DD/MM/YYYY")}</td>
                    <td>{item?.points}</td>
                    <td>{item?.interview}</td>
                    <td>{item?.status}</td>
                    <td className={style.list__action}>
                      <Link
                        to={`/recruitment/${item?.id}`}
                        className={style.list__btn__edit}
                      ></Link>
                      <button
                        className={style.list__btn__delete}
                        onClick={() => {
                          handleShow();
                          setCandidateSelected(item);
                        }}
                      ></button>
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
            >
              {pageSizes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="candidate-pagination">
            <Pagination className="m-0">
              {pageCounts.map((item) => (
                <Pagination.Item
                  key={item}
                  active={item === currentPage}
                  onClick={() => handleCurrentPage(item)}
                >
                  {item}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
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
    </>
  );
};

export default RecruitmentList;
