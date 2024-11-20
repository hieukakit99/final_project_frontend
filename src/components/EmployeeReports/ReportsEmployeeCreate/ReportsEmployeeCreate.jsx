import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import reportEmployeeApi from "../../../api/reportEmployeeApi";
import { REPORT_TYPES, REPORT_STATUSES } from "../../../api/reportEmployeeApi";
import styles from "./reports-employee-create.module.scss";

const ReportsEmployeeCreate = () => {
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
      await reportEmployeeApi.createReport(state.formData);
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
    navigate("/employee-reports");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.btnBack}>
        <Link to="/employee-reports">
          <button className={styles.backButton}>← Back</button>
        </Link>
      </div>

      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2>Thêm Báo Cáo Nhân Sự</h2>

          {state.error && (
            <div className={styles.errorMessage}>{state.error}</div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="title">Tiêu đề báo cáo:</label>
            <input
              id="title"
              type="text"
              placeholder="Nhập tiêu đề báo cáo"
              name="title"
              value={state.formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">Loại báo cáo:</label>
            <select
              id="type"
              name="type"
              value={state.formData.type}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="" disabled hidden>
                Chọn loại báo cáo
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
            <label htmlFor="reason">Nội dung báo cáo:</label>
            <textarea
              id="reason"
              placeholder="Nhập nội dung báo cáo"
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
              onClick={() => navigate("/employee-reports")}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={state.loading}
            >
              {state.loading ? "Đang lưu..." : "Lưu báo cáo"}
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
          <p>Báo cáo đã được lưu thành công!</p>
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

export default ReportsEmployeeCreate;
