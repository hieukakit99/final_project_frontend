import React, { useState, useEffect, useMemo } from "react";
import styles from "./employee-reports.module.scss";
import { Link } from "react-router-dom";
import { Pagination, Modal } from "react-bootstrap";
import reportEmployeeApi from "../../api/reportEmployeeApi";

const EmployeeReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch reports from the API
  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: pageSize,
        search,
        startDate,
        endDate,
        reportType,
      };
      const data = await reportEmployeeApi.getAllReports(params);
      setReports(data);
      setTotalReports(data.length);
    } catch (err) {
      setError("Failed to load reports.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch reports when page or filters change
  useEffect(() => {
    fetchReports();
  }, [currentPage, search, startDate, endDate, reportType, pageSize]);

  const pageCount = useMemo(() => {
    return Math.ceil(totalReports / pageSize);
  }, [totalReports, pageSize]);

  const currentReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return reports.slice(start, end);
  }, [reports, currentPage, pageSize]);

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedReport) {
      try {
        await reportEmployeeApi.deleteReport(selectedReport.id);
        setReports(reports.filter((report) => report.id !== selectedReport.id));
        setSelectedReport(null);
        setShowModal(false);
      } catch (err) {
        setError("Failed to delete report.");
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.reportContainer}>
          <h2>Danh Sách Báo Cáo Nhân Sự</h2>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <div className={styles.searchForm}>
              <div>Tìm kiếm báo cáo:</div>
              <input
                type="text"
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className={styles.dateRange}>
                <div>
                  <span>Từ ngày:</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <span>Đến ngày:</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div>
                  <span>Loại báo cáo:</span>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="">Chọn loại báo cáo</option>
                    <option value="Đánh giá">Đánh giá</option>
                    <option value="Tuyển dụng">Tuyển dụng</option>
                    <option value="Đào tạo">Đào tạo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Report Table */}
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Mã báo cáo</th>
                <th>Tiêu đề</th>
                <th>Loại báo cáo</th>
                <th>Ngày tạo</th>
                <th>Người tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7">{error}</td>
                </tr>
              ) : (
                currentReports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.title}</td>
                    <td>{report.type}</td>
                    <td>{report.createdAt}</td>
                    <td>{report.creator}</td>
                    <td>{report.status}</td>
                    <td>
                      <button className={styles.buttonSend}>Gửi</button>
                      <Link to={`/employee-reports/${report.id}`}>
                        <button className={styles.buttonEdit}>Sửa</button>
                      </Link>
                      <button
                        className={styles.buttonDelete}
                        onClick={() => handleDeleteClick(report)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.tableFooter}>
            <Link to="/employee-reports/create">
              <button className={styles.addButton}>+ Thêm báo cáo</button>
            </Link>
            <div className={styles.pagination}>
              <Pagination>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                  (page) => (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal show={showModal} centered onHide={() => setShowModal(false)}>
          <Modal.Header className="justify-content-center">
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column align-items-center">
              <p>Bạn có chắc muốn xóa báo cáo này?</p>
              <div>
                <button
                  className={styles.buttonDelete}
                  onClick={handleDeleteConfirm}
                >
                  Xóa
                </button>
                <button
                  className={styles.buttonCancel}
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeReports;
