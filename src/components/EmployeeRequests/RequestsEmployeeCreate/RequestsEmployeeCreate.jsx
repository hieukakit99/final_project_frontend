import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import requestEmployeeApi from "../../../api/requestEmployeeApi";
import { REPORT_TYPES, REPORT_STATUSES } from "../../../api/requestEmployeeApi";
import styles from "./requests-employee-create.module.scss";

const RequestsEmployeeCreate = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    formData: {
      title: "",
      type: "",
      creator: "",
      status: REPORT_STATUSES.UNFINISHED,
      reason: "",
    },
    loading: false,
    error: null,
    showConfirmModal: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      error: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.loading) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await requestEmployeeApi.createRequest(state.formData);
      setState((prev) => ({ ...prev, showConfirmModal: true }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!",
        loading: false,
      }));
    }
  };

  const handleConfirmSuccess = () => {
    setState((prev) => ({ ...prev, showConfirmModal: false }));
    navigate("/employee-requests");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.btnBack}>
        <Link to="/employee-requests">
          <button className={styles.backButton}>← Back</button>
        </Link>
      </div>

      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2>Thêm Request</h2>

          {state.error && (
            <div className={styles.errorMessage}>{state.error}</div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="title">Tiêu đề Request:</label>
            <input
              id="title"
              type="text"
              placeholder="Nhập tiêu đề request"
              name="title"
              value={state.formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">Loại Request:</label>
            <select
              id="type"
              name="type"
              value={state.formData.type}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="" disabled hidden>
                Chọn loại Request
              </option>
              <option value={REPORT_TYPES.EVALUATION}>Đánh giá</option>
              <option value={REPORT_TYPES.RECRUITMENT}>Tuyển dụng</option>
              <option value={REPORT_TYPES.TRAINING}>Đào tạo</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="creator">Người tạo:</label>
            <input
              id="creator"
              type="text"
              placeholder="Nhập tên người tạo"
              name="creator"
              value={state.formData.creator}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Trạng thái:</label>
            <select
              id="status"
              name="status"
              value={state.formData.status}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value={REPORT_STATUSES.UNFINISHED}>Chưa xong</option>
              <option value={REPORT_STATUSES.IN_PROGRESS}>
                Đang hoàn thành
              </option>
              <option value={REPORT_STATUSES.COMPLETE}>Hoàn thành</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reason">Nội dung Request:</label>
            <textarea
              id="reason"
              placeholder="Nhập nội dung request"
              name="reason"
              value={state.formData.reason}
              onChange={handleChange}
              required
              className={styles.textarea}
              rows={5}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate("/employee-requests")}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={state.loading}
            >
              {state.loading ? "Đang lưu..." : "Lưu request"}
            </button>
          </div>
        </form>
      </div>

      <Modal
        show={state.showConfirmModal}
        onHide={handleConfirmSuccess}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Request đã được lưu thành công!</p>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.agreeButton} onClick={handleConfirmSuccess}>
            Đồng ý
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RequestsEmployeeCreate;
