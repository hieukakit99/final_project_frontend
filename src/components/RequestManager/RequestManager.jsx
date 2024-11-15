import React, { useState, useEffect } from "react";
import style from "./request-manager.module.scss";
import { Pagination, Modal, Button, Form } from "react-bootstrap";
import moment from "moment";

const RequestManager = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const pageSize = 5;

  const fetchRequests = async () => {
    const data = [
      {
        id: 1,
        employee: "Nguyên Văn A",
        type: "Nghỉ phép",
        details: "Yêu cầu nghỉ phép 5 ngày",
        status: "Chờ duyệt",
        createdAt: "2023-10-10",
        updatedAt: "2023-10-10",
        managerApproved: false,
        adminApproved: false,
      },
      {
        id: 2,
        employee: "Nguyên Văn B",
        type: "Thiết bị",
        details: "Yêu cầu laptop mới",
        status: "Đã duyệt bởi QL",
        createdAt: "2023-10-08",
        updatedAt: "2023-10-09",
        managerApproved: true,
        adminApproved: false,
      },
      // More data here...
    ];
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);

  const pageCounts = Array.from(
    { length: Math.ceil(requests.length / pageSize) },
    (_, i) => i + 1
  );

  const handleReject = (id) => {
    setSelectedRequestId(id);
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    // Xử lý logic từ chối ở đây
    console.log("Lý do từ chối:", rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
  };

  const handleAccept = (id) => {
    // Xử lý logic chấp nhận ở đây
    console.log("Yêu cầu đã được chấp nhận:", id);
  };

  return (
    <div className={style.container}>
      <h2>Quản lý Request</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Mã yêu cầu</th>
            <th>Nhân viên</th>
            <th>Loại yêu cầu</th>
            <th>Chi tiết yêu cầu</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item) => (
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
        <Pagination className={style.custom_pagination}>
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
      </div>

      {/* Modal từ chối */}
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

export default RequestManager;
