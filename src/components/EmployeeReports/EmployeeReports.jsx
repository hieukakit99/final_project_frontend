import React, { useState } from "react";
import styles from "./employee-reports.module.scss";
import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const EmployeeReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const pageSize = 5;

  const pageCounts = Array.from(
    { length: Math.ceil(reports.length / pageSize) },
    (_, i) => i + 1
  );

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.reportContainer}>
          <h2>Danh Sách Báo Cáo Nhân Sự</h2>

          <div className={styles.searchBox}>
            <div className={styles.searchForm}>
              <div>Tìm kiếm báo cáo:</div>
              <input type="text" className={styles.searchInput} />
              <div className={styles.dateRange}>
                <div>
                  <span>Từ ngày:</span>
                  <input type="date" />
                </div>
                <div>
                  <span>Đến ngày:</span>
                  <input type="date" />
                </div>
                <div>
                  <span>Loại báo cáo:</span>
                  <select>
                    <option>Đánh giá</option>
                    <option>Tuyển dụng</option>
                    <option>Đào tạo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.recipientSection}>
            <div className={styles.sectionTitle}>Gửi báo cáo đến:</div>
            <div className={styles.recipientGroups}>
              <div className={styles.group}>
                <div className={styles.groupTitle}>Ban Lãnh đạo:</div>
                <label>
                  <input type="checkbox" checked /> CEO
                </label>
                <label>
                  <input type="checkbox" checked /> Phó GĐ
                </label>
              </div>

              <div className={styles.group}>
                <div className={styles.groupTitle}>Phòng Nhân Sự:</div>
                <label>
                  <input type="checkbox" checked /> Trưởng phòng NS
                </label>
              </div>

              <div className={styles.group}>
                <div className={styles.groupTitle}>Bộ phận liên quan:</div>
                <label>
                  <input type="checkbox" checked /> Phòng Kế toán
                </label>
                <label>
                  <input type="checkbox" /> Công đoàn
                </label>
              </div>

              <div className={styles.group}>
                <div className={styles.groupTitle}>Đơn vị ngoài:</div>
                <label>
                  <input type="checkbox" /> Cơ quan NN
                </label>
              </div>
            </div>
          </div>

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
              <tr>
                <td>BC001</td>
                <td>Báo cáo nhân sự Quý 1/2024</td>
                <td>Báo cáo quý</td>
                <td>01/04/2024</td>
                <td>Nguyễn Văn A</td>
                <td>Đã duyệt</td>
                <td>
                  <button className={styles.buttonSend}>Gửi</button>
                  <Link to="/employee-reports/edit">
                    <button className={styles.buttonEdit}>Sửa</button>
                  </Link>
                  <button className={styles.buttonDelete}>Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.tableFooter}>
            <Link to="/employee-reports/create">
              <button className={styles.addButton}>+ Thêm báo cáo</button>
            </Link>
            <div className={styles.pagination}>
              <Pagination>
                <Pagination.Prev
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                />
                {pageCounts.map((page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    currentPage < pageCounts.length &&
                    setCurrentPage(currentPage + 1)
                  }
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReports;
