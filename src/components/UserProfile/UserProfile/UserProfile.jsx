import { Link } from "react-router-dom";
import style from "./user-profile.module.scss";
import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className={style.personalInfo}>
      <h2>Quản lí thông tin cá nhân</h2>
      <div className={style.infoCard}>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Department:</strong> {user.department}
        </p>
        <p>
          <strong>Position:</strong> {user.position}
        </p>
        <p>
          <strong>Skills:</strong> {user.skills.join(", ")}
        </p>
        <p>
          <strong>Ngày tham gia:</strong> {user.joinDate}
        </p>
        <Link to="/user/update" className={style.linkButton}>
          <span></span>
          <button className={style.editButton}>Sửa</button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
