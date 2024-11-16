import { Link } from "react-router-dom";
import style from "./dashboard.module.scss";
import List from "../Icons/List";
import TriangleDown from "../Icons/TriangleDown";
import { useState } from "react";
import UserList from "../UserProfile/UserList/UserList";

const Dashboard = () => {
  const [isApprovalOpen, setIsApprovalOpen] = useState(false); // State to control dropdown visibility

  const classes = {
    dashboardContainer: `${style.dashboard__container}`,
    header: `${style.dashboard__header}`,
    dashboardMenu: `${style.dashboard__menu}`,
    menuItem: `${style.dashboard__item}`,
    menuItemIcon: `${style.dashboard__itemIcon}`,
    menuItemText: `${style.dashboard__itemText}`,
    approvalDropdown: `${style.approvalDropdown}`,
  };

  const toggleApproval = () => {
    setIsApprovalOpen(!isApprovalOpen);
  };

  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.header}>
        <List />
        <h3 className={classes.menuTitle}>Dashboard</h3>
        <TriangleDown />
      </div>

      <div className={classes.dashboardMenu}>
        <Link to="/users" className={classes.menuItem}>
          <span className={classes.menuItemIcon}>👤</span>
          <span className={classes.menuItemText}>Users</span>
        </Link>

        <Link to="/employee-profile" className={classes.menuItem}>
          <span className={classes.menuItemIcon}>📋</span>
          <span className={classes.menuItemText}>Quản lý Hồ Sơ Nhân Viên</span>
        </Link>

        <Link to="/work-process" className={classes.menuItem}>
          <span className={classes.menuItemIcon}>📈</span>
          <span className={classes.menuItemText}>
            Quản lý Quá Trình Làm Việc
          </span>
        </Link>

        <Link to="/recruitments" className={classes.menuItem}>
          <span className={classes.menuItemIcon}>📚</span>
          <span className={classes.menuItemText}>Quản lý Tuyển dụng</span>
        </Link>

        <Link to="/trainings" className={classes.menuItem}>
          <span className={classes.menuItemIcon}>📘</span>
          <span className={classes.menuItemText}>Quản lý Đào tạo</span>
        </Link>

        {/* Approval Dropdown */}
        <div className={classes.menuItem} onClick={toggleApproval}>
          <span className={classes.menuItemIcon}>✅</span>
          <span className={classes.menuItemText}>Approval</span>
          <TriangleDown />
        </div>
        {isApprovalOpen && (
          <div className={classes.approvalDropdown}>
            <Link to="/reports" className={classes.menuItem}>
              <span className={classes.menuItemIcon}>📊</span>
              <span className={classes.menuItemText}>Quản lý Báo Cáo</span>
            </Link>
            <Link to="/request" className={classes.menuItem}>
              <span className={classes.menuItemIcon}>❓</span>
              <span className={classes.menuItemText}>Quản lý Request</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
