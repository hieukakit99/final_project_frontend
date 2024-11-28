import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EmployeeList.module.scss"; // Assuming we have an SCSS module
import Pagination from "react-bootstrap/Pagination"; // Assuming Bootstrap pagination

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize] = useState(9); // Number of employees per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/employee-profiles", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.userName &&
      employee.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredEmployees.length / pageSize); // Calculate total number of pages

  // Get the employees to display on the current page
  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchAndAdd}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Tìm kiếm nhân viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={styles.addButton}
          onClick={() => navigate("/add-employee")}
        >
          Thêm Nhân Viên Mới
        </button>
      </div>

      <div className={styles.employeeList}>
        {displayedEmployees.length > 0 ? (
          displayedEmployees.map((employee) => (
            <div
              key={employee.profileId}
              className={styles.employeeCard}
              onClick={() =>
                navigate(`/employee-details/${employee.profileId}`)
              }
            >
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {employee.userName || "Chưa cập nhật"}
                </h3>
                <p className={styles.cardText}>
                  <div className={styles.cardRow}>
                    <strong>Chức danh:</strong>
                    <span>{employee.jobTitle || "N/A"}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <strong>Phòng ban:</strong>
                    <span>{employee.departmentName || "N/A"}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <strong>Ngày thuê:</strong>
                    <span>{employee.hireDate || "N/A"}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <strong>Trạng thái:</strong>
                    <span
                      className={`${styles.badge} ${
                        employee.status === "Active"
                          ? styles.active
                          : employee.status === "Inactive"
                          ? styles.inactive
                          : styles.secondary
                      }`}
                    >
                      {employee.status || "N/A"}
                    </span>
                  </div>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noEmployee}>
            <div className={styles.card}>
              <p>Không tìm thấy nhân viên nào.</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.page}>
        {/* Pagination controls */}
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          />

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === pageCount}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(pageCount)}
            disabled={currentPage === pageCount}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default EmployeeList;
