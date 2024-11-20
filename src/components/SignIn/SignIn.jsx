import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./signin.module.scss";
import axios from "axios";
import { Form } from "react-bootstrap";
import authApi from "../../api/authApi";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
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
    setCredentials({
      ...credentials,
      username: event.target.value,
    });
  };

  const onChangePassword = (event) => {
    setCredentials({
      ...credentials,
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
    if (!credentials.username.trim()) {
      msgError.username = "❌ User name is required";
    }
    if (!credentials.password.trim()) {
      msgError.password = "❌ Password is required";
    }
    if (msgError.username || msgError.password) {
      setMessageError(msgError);
      return;
    }

    try {
      const { data } = await authApi.login(credentials);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.accessToken);

      // Nếu đăng nhập thành công
      setCredentials({ username: "", password: "" });
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
            value={credentials.username}
            onChange={onChangeUserName}
            className={style["sign-in__textfield"]}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={credentials.password}
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
