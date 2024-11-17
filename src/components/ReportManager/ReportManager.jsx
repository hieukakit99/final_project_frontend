import React, { useState, useEffect } from "react";
import { Pagination, Modal, Button, Form } from "react-bootstrap";
import moment from "moment";
import reportApi from "../../api/reportApi";
import style from "./report-manager.module.scss";

const ReportManager = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize] = useState(5);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportApi.getAllRequests({
        page: currentPage,
        limit: pageSize,
      });

      if (Array.isArray(response)) {
        setRequests(
          response.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        );
        setTotalItems(response.length);
      } else if (response && response.data) {
        setRequests(response.data);
        // Sử dụng total từ response API nếu có
        setTotalItems(response.total || response.data.length);
      } else {
        setRequests([]);
        setTotalItems(0);
        setError("Invalid data format received from server");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch requests. Please try again later.");
      setRequests([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReject = (id) => {
    setSelectedRequestId(id);
    setShowRejectModal(true);
  };

  const handleConfirmReject = async () => {
    try {
      await reportApi.rejectRequest(selectedRequestId, rejectReason);
      alert("Request rejected successfully.");
      fetchRequests();
      setShowRejectModal(false);
      setRejectReason("");
    } catch (error) {
      alert("Failed to reject the request.");
    }
  };

  const handleAccept = async (id) => {
    try {
      await reportApi.approveRequest(id);
      alert("Request approved successfully.");
      fetchRequests();
    } catch (error) {
      alert("Failed to approve the request.");
    }
  };

  // Tính tổng số trang dựa trên tổng số items
  const totalPages = Math.ceil(totalItems / pageSize);

  // Tạo mảng số trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <h2>Quản lý Báo Cáo</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : requests.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Mã báo cáo</th>
                <th>Nhân viên</th>
                <th>Loại yêu cầu</th>
                <th>Chi tiết yêu cầu</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.employee}</td>
                  <td>{item.type}</td>
                  <td>{item.details}</td>
                  <td>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                  <td>
                    <button
                      className={style.btnAccept}
                      onClick={() => handleAccept(item.id)}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className={style.btnDecline}
                      onClick={() => handleReject(item.id)}
                    >
                      Từ chối
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={style.pagination}>
            <Pagination>
              <Pagination.Prev
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              />
              {pageNumbers.map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}

      <Modal
        show={showRejectModal}
        onHide={() => setShowRejectModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Lý do từ chối</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rejectReason">
              <Form.Label>Nhập lý do từ chối:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmReject}>
            Xác nhận từ chối
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportManager;
