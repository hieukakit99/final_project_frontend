import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Pagination, Modal } from "react-bootstrap";
import reportEmployeeApi from "../../api/reportEmployeeApi";
import { REPORT_TYPES } from "../../api/reportEmployeeApi";
import styles from "./employee-requests.module.scss";

const EmployeeRequests = () => {
  const [state, setState] = useState({
    currentPage: 1,
    reports: [],
    totalReports: 0,
    loading: false,
    error: null,
    search: "",
    startDate: "",
    endDate: "",
    reportType: "",
    pageSize: 5,
    showModal: false,
    selectedReport: null,
  });

  const fetchReports = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const params = {
        page: state.currentPage,
        limit: state.pageSize,
        search: state.search,
        startDate: state.startDate,
        endDate: state.endDate,
        reportType: state.reportType,
      };
      const data = await reportEmployeeApi.getAllReports(params);
      setState((prev) => ({
        ...prev,
        reports: data,
        totalReports: data.length,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Không thể tải danh sách báo cáo",
        loading: false,
      }));
    }
  }, [
    state.currentPage,
    state.pageSize,
    state.search,
    state.startDate,
    state.endDate,
    state.reportType,
  ]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDeleteReport = async () => {
    if (!state.selectedReport) return;

    try {
      await reportEmployeeApi.deleteReport(state.selectedReport.id);
      setState((prev) => ({
        ...prev,
        reports: prev.reports.filter(
          (report) => report.id !== prev.selectedReport.id
        ),
        showModal: false,
        selectedReport: null,
      }));
      alert("Xóa báo cáo thành công!");
    } catch (error) {
      alert(error.message || "Không thể xóa báo cáo. Vui lòng thử lại!");
    }
  };

  const pageCount = useMemo(() => {
    return Math.ceil(state.totalReports / state.pageSize);
  }, [state.totalReports, state.pageSize]);

  const currentReports = useMemo(() => {
    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    return state.reports.slice(start, end);
  }, [state.reports, state.currentPage, state.pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.reportContainer}>
          <h2>Danh Sách Báo Cáo Nhân Sự</h2>

          <div className={styles.searchBox}>
            <div className={styles.searchForm}>
              <input
                type="text"
                placeholder="Tìm kiếm báo cáo..."
                value={state.search}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, search: e.target.value }))
                }
                className={styles.searchInput}
              />

              <div className={styles.dateRange}>
                <div>
                  <span>Từ ngày:</span>
                  <input
                    type="date"
                    value={state.startDate}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <span>Đến ngày:</span>
                  <input
                    type="date"
                    value={state.endDate}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, endDate: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <span>Loại báo cáo:</span>
                  <select
                    value={state.reportType}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        reportType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Tất cả</option>
                    <option value={REPORT_TYPES.EVALUATION}>Đánh giá</option>
                    <option value={REPORT_TYPES.RECRUITMENT}>Tuyển dụng</option>
                    <option value={REPORT_TYPES.TRAINING}>Đào tạo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {state.error && <div className={styles.error}>{state.error}</div>}

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
              {state.loading ? (
                <tr>
                  <td colSpan="7" className={styles.loading}>
                    Đang tải...
                  </td>
                </tr>
              ) : currentReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.noData}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                currentReports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.title}</td>
                    <td>{report.type}</td>
                    <td>
                      {new Date(report.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td>{report.creator}</td>
                    <td>{report.status}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.buttonSend}
                        onClick={() => alert("Tính năng đang phát triển")}
                      >
                        Gửi
                      </button>
                      <Link to={`/employee-reports/${report.id}`}>
                        <button className={styles.buttonEdit}>Sửa</button>
                      </Link>
                      <button
                        className={styles.buttonDelete}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            showModal: true,
                            selectedReport: report,
                          }))
                        }
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className={styles.tableFooter}>
            <Link to="/employee-reports/create">
              <button className={styles.addButton}>+ Thêm báo cáo</button>
            </Link>

            {pageCount > 1 && (
              <div className={styles.pagination}>
                <Pagination>
                  <Pagination.First
                    onClick={() =>
                      setState((prev) => ({ ...prev, currentPage: 1 }))
                    }
                    disabled={state.currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        currentPage: prev.currentPage - 1,
                      }))
                    }
                    disabled={state.currentPage === 1}
                  />

                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                    (page) => (
                      <Pagination.Item
                        key={page}
                        active={page === state.currentPage}
                        onClick={() =>
                          setState((prev) => ({ ...prev, currentPage: page }))
                        }
                      >
                        {page}
                      </Pagination.Item>
                    )
                  )}

                  <Pagination.Next
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        currentPage: prev.currentPage + 1,
                      }))
                    }
                    disabled={state.currentPage === pageCount}
                  />
                  <Pagination.Last
                    onClick={() =>
                      setState((prev) => ({ ...prev, currentPage: pageCount }))
                    }
                    disabled={state.currentPage === pageCount}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={state.showModal}
        onHide={() =>
          setState((prev) => ({
            ...prev,
            showModal: false,
            selectedReport: null,
          }))
        }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className={styles.iconDelete}></span>
          <p>Bạn có chắc chắn muốn xóa báo cáo này?</p>
          <p className={styles.reportTitle}>
            <strong>Tiêu đề:</strong> {state.selectedReport?.title}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={styles.buttonCancel}
            onClick={() =>
              setState((prev) => ({
                ...prev,
                showModal: false,
                selectedReport: null,
              }))
            }
          >
            Hủy
          </button>
          <button
            className={styles.buttonDeleteModal}
            onClick={handleDeleteReport}
          >
            Xóa
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeRequests;
