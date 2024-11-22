import React from "react";
import { useState } from "react";
import "./NotificationList.css";

const NotificationList = ({ notifications, setNotifications }) => {
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  return (
    <div className="notification-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Người gửi</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{notification.sender}</td>
              <td>{notification.title}</td>
              <td>{notification.content}</td>
              <td>{notification.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationList;
