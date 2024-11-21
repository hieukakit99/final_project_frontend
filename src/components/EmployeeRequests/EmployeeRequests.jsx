import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Pagination, Modal } from "react-bootstrap";
import { REPORT_TYPES } from "../../api/requestEmployeeApi";
import styles from "./employee-requests.module.scss";
import requestEmployeeApi from "../../api/requestEmployeeApi";

const EmployeeRequests = () => {
  const [state, setState] = useState({
    currentPage: 1,
    requests: [],
    totalRequests: 0,
    loading: false,
    error: null,
    search: "",
    startDate: "",
    endDate: "",
    requestType: "",
    pageSize: 5,
    showModal: false,
    selectedRequest: null,
  });

  const fetchRequests = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const params = {
        page: state.currentPage,
        limit: state.pageSize,
        search: state.search,
        startDate: state.startDate,
        endDate: state.endDate,
        requestType: state.requestType,
      };
      const data = await requestEmployeeApi.getAllRequests(params);
      setState((prev) => ({
        ...prev,
        requests: data,
        totalRequests: data.length,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Không thể tải danh sách request",
        loading: false,
      }));
    }
  }, [
    state.currentPage,
    state.pageSize,
    state.search,
    state.startDate,
    state.endDate,
    state.requestType,
  ]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDeleteRequest = async () => {
    if (!state.selectedRequest) return;

    try {
      await requestEmployeeApi.deleteRequest(state.selectedRequest.id);
      setState((prev) => ({
        ...prev,
        requests: prev.requests.filter(
          (request) => request.id !== prev.selectedRequest.id
        ),
        showModal: false,
        selectedRequest: null,
      }));
      alert("Xóa request thành công!");
    } catch (error) {
      alert(error.message || "Không thể xóa request. Vui lòng thử lại!");
    }
  };

  const pageCount = useMemo(() => {
    return Math.ceil(state.totalRequests / state.pageSize);
  }, [state.totalRequests, state.pageSize]);

  const currentRequests = useMemo(() => {
    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    return state.requests.slice(start, end);
  }, [state.requests, state.currentPage, state.pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.requestContainer}>
          <h2>Danh Sách Request</h2>

          <div className={styles.searchBox}>
            <div className={styles.searchForm}>
              <input
                type="text"
                placeholder="Tìm kiếm request..."
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
                  <span>Loại request:</span>
                  <select
                    value={state.requestType}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        requestType: e.target.value,
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

          <table className={styles.requestTable}>
            <thead>
              <tr>
                <th>Mã request</th>
                <th>Tiêu đề</th>
                <th>Loại request</th>
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
              ) : currentRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.noData}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                currentRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.title}</td>
                    <td>{request.type}</td>
                    <td>
                      {new Date(request.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td>{request.creator}</td>
                    <td>{request.status}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.buttonSend}
                        onClick={() => alert("Tính năng đang phát triển")}
                      >
                        Gửi
                      </button>
                      <Link to={`/employee-requests/${request.id}`}>
                        <button className={styles.buttonEdit}>Sửa</button>
                      </Link>
                      <button
                        className={styles.buttonDelete}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            showModal: true,
                            selectedRequest: request,
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
            <Link to="/employee-requests/create">
              <button className={styles.addButton}>+ Thêm Request</button>
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
            selectedRequest: null,
          }))
        }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className={styles.iconDelete}></span>
          <p>Bạn có chắc chắn muốn xóa request này?</p>
          <p className={styles.requestTitle}>
            <strong>Tiêu đề:</strong> {state.selectedRequest?.title}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={styles.buttonCancel}
            onClick={() =>
              setState((prev) => ({
                ...prev,
                showModal: false,
                selectedRequest: null,
              }))
            }
          >
            Hủy
          </button>
          <button
            className={styles.buttonDeleteModal}
            onClick={handleDeleteRequest}
          >
            Xóa
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeRequests;
