import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./signin.module.scss";

const validAccounts = [
  { username: "thanh123", password: "123456" },
  { username: "thanh1234", password: "123456" },
  { username: "thanh12345", password: "123456" },
];

const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Sử dụng để điều hướng trang sau khi đăng nhập thành công.

  const msgError = {
    username: "",
    password: "",
    invalidAccount: "",
  };

  const [messageError, setMessageError] = useState({
    username: "",
    password: "",
    invalidAccount: "",
  });

  const onChangeUserName = (event) => {
    setUser({
      ...user,
      username: event.target.value,
    });
  };

  function onChangePassword(event) {
    setUser({
      ...user,
      password: event.target.value,
    });
  }

  const handleSignIn = () => {
    // validate form
    // Reset error messages
    const msgError = {
      username: "",
      password: "",
      invalidAccount: "",
    };

    if (user.username.trim().length === 0) {
      msgError.username = "❌ User name is required";
    }
    if (user.password.trim().length === 0) {
      msgError.password = "❌ Password is required";
    }

    if (msgError.username || msgError.password) {
      setMessageError(msgError);
      return;
    }

    // Kiểm tra xem tài khoản có hợp lệ không
    const accountValid = validAccounts.find(
      (acc) => acc.username === user.username && acc.password === user.password
    );

    if (!accountValid) {
      msgError.invalidAccount = "❌ Incorrect username and password";
    } else {
      localStorage.setItem("userToken", "valid-token");
      setUser({
        username: "",
        password: "",
      });
      navigate("/"); // Điều hướng về trang chủ
      return;
    }

    setMessageError(msgError); // Cập nhật thông báo lỗi
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <div className={style["sign-in"]}>
      <div className={style["sign-in__container"]}>
        <div className={style["sign-in__heading"]}>Welcome</div>
        <div className={style["sign-in__error"]}>
          <p>{messageError.username}</p>
          <p>{messageError.password}</p>
          <p>{messageError.invalidAccount}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your user name"
            value={user.username}
            onChange={onChangeUserName}
            className={style["sign-in__textfield"]}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={onChangePassword}
            className={style["sign-in__textfield"]}
          />
          <button onClick={handleSignIn} className={style["sign-in__btn"]}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
