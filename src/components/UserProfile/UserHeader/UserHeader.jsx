import React from "react";
import style from "./user-header.module.scss";

const UserHeader = ({ userName }) => (
  <div className={style.profileHeader}>
    <img
      src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
      alt="User Profile"
      className={style.profileImage}
    />
    <div className={style.welcomeMessage}>
      <p>Hello, {userName}</p>
      <p>Welcome Back!</p>
    </div>
  </div>
);

export default UserHeader;
