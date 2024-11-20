import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./signin.module.scss";
import axios from "axios";
import { Form } from "react-bootstrap";

const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [messageError, setMessageError] = useState({
    username: "",
    password: "",
    invalidAccount: "",
  });

  const navigate = useNavigate();

  const onChangeUserName = (event) => {
    setUser({
      ...user,
      username: event.target.value,
    });
  };

  const onChangePassword = (event) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  const handleSignIn = async () => {
    const msgError = {
      username: "",
      password: "",
      invalidAccount: "",
    };

    // Validate input
    if (!user.username.trim()) {
      msgError.username = "❌ User name is required";
    }
    if (!user.password.trim()) {
      msgError.password = "❌ Password is required";
    }
    if (msgError.username || msgError.password) {
      setMessageError(msgError);
      return;
    }

    try {
      // Call API để lấy danh sách user
      const response = await axios.get(
        "https://67371888aafa2ef222329aa5.mockapi.io/login"
      );
      const users = response.data;

      // Kiểm tra thông tin đăng nhập
      const accountValid = users.find(
        (u) => u.username === user.username && u.password === user.password
      );

      if (!accountValid) {
        msgError.invalidAccount = "❌ Incorrect username and password";
        setMessageError(msgError);
        return;
      }

      // Nếu đăng nhập thành công
      localStorage.setItem("userId", accountValid.id); // Lưu id user vào localStorage
      setUser({ username: "", password: "" });
      setMessageError({ username: "", password: "", invalidAccount: "" });

      // Điều hướng đến homepage
      navigate(`/`);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi khi đăng nhập.");
    }
  };

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
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={user.password}
            onChange={onChangePassword}
            className={style["sign-in__textfield"]}
          />

          <div controlId="formShowPassword" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Hiện mật khẩu"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>

          <button onClick={handleSignIn} className={style["sign-in__btn"]}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
