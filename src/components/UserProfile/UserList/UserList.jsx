import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../../../api/userApi"; // Import userApi service
import styles from "./user-list.module.scss";

const UserList = () => {
  // Initial state for userData
  const defaultUserData = {
    id: "",
    fullName: "",
    taxId: "123456",
    email: "",
    gender: "",
    phone: "",
    birthDate: "",
    department: "",
    position: "",
    address: "",
    skill: "",
    country: "Việt Nam",
    points: 0,
    expireDate: "",
    postedAds: 0,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await userApi.getUsers();
        if (users && users.length > 0) {
          setUserData(users[0]); // Hiển thị người dùng đầu tiên
        } else {
          setError("Không tìm thấy người dùng nào.");
        }
      } catch (error) {
        setError("Lỗi khi lấy dữ liệu người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    if (!userData.fullName.trim()) {
      alert("Họ và tên là bắt buộc.");
      return false;
    }
    if (!userData.email.includes("@")) {
      alert("Email không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await userApi.updateUser(userData.id, userData);
        alert("Cập nhật thông tin thành công!");
      } catch {
        alert("Lỗi khi cập nhật thông tin.");
      }
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.userManagement}>
      <div className={styles.info__content}>
        {/* Left Section */}
        <div className={styles.info__wrapper}>
          <form className={styles.info__form} onSubmit={handleSubmit}>
            <h2 className={styles.info__title}>Thông tin cá nhân</h2>

            <div className={styles.info__row}>
              <div className={styles.info__formGroup}>
                <label className={styles.info_label}>ID:</label>
                <input
                  className={styles.input}
                  type="text"
                  name="id"
                  value={userData.id}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className={styles.info__formGroup}>
                <label className={styles.info_label}>CCCD:</label>
                <input
                  className={styles.input}
                  type="taxId"
                  name="taxId"
                  value={userData.taxId}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>

            <div className={styles.info__row}>
              <div className={styles.info__formGroup}>
                <label className={styles.info_label}>Họ và tên</label>
                <input
                  className={styles.input}
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className={styles.info__formGroup}>
                <label className={styles.info_label}>Giới tính</label>
                <input
                  className={styles.select}
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>

            <div className={styles.info__row}>
              <div className={styles.info__formGroup}>
                <label className={styles.info_label}>Ngày sinh</label>
                <input
                  className={styles.input}
                  type="tel"
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className={styles.info__formGroup}>
                <label className={styles.info_label}>Số điện thoại</label>
                <input
                  className={styles.input}
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>Địa chỉ</label>
              <input
                className={styles.input}
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>Kĩ năng</label>
              <select
                className={styles.select}
                name="skill"
                value={userData.skill}
                onChange={handleChange}
              >
                <option value="">Java</option>
                <option value="tech">C#</option>
                <option value="finance">Python</option>
                <option value="education">.NET</option>
              </select>
            </div>
            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>Phòng ban</label>
              <select
                className={styles.select}
                name="department"
                value={userData.department}
                onChange={handleChange}
              >
                <option value="hanoi">Nhân sự</option>
                <option value="hcm">Hỗ trợ</option>
                <option value="danang">Quản lý</option>
              </select>
            </div>

            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>Quốc gia</label>
              <select
                className={styles.select}
                name="country"
                value={userData.country}
                onChange={handleChange}
              >
                <option value="Việt Nam">Việt Nam</option>
              </select>
            </div>

            <button className={styles.info__submit} type="submit">
              Cập nhật thông tin
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className={styles.service__info}>
          <div className={styles.service__card}>
            <h2>Thông tin dịch vụ</h2>
            <div className={styles.service__section}>
              <img
                src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                alt="User"
                className={styles.profileImage}
              />
              <h3>{userData.fullName}</h3>
              <button className={styles.changePhotoBtn}>
                Đổi ảnh đại diện
              </button>
            </div>

            <div className={styles.pointsInfo}>
              {/* <p>Điểm tích lũy: {userData.points}</p>
              <a href="#" className={styles.pointsPolicyLink}>
                Xem chính sách tích lũy điểm
              </a> */}
              <p className={styles.expireDate}>
                Ngày tham gia: {userData.expireDate}
              </p>
            </div>

            {/* <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Tin đăng ký</span>
                <span className={styles.statValue}>Không giới hạn</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Tin đã gửi</span>
                <span className={styles.statValue}>{userData.postedAds}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Tin còn lại</span>
                <span className={styles.statValue}>Không giới hạn</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
