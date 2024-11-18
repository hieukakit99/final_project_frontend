import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userApi } from "../../../api/userApi"; // Import userApi service
import styles from "./user-list.module.scss";

const UserList = () => {
  // Initial state for userData
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    taxId: "",
    email: "",
    gender: "",
    phone: "",
    department: "",
    position: "",
    company: "",
    skill: "",
    country: "Việt Nam",
    city: "",
    points: 0,
    expireDate: "",
    postedAds: 0,
  });

  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await userApi.getUsers(); // Fetch the list of users from API
        if (users.length > 0) {
          setUserData(users[0]); // Assuming we want to display the first user
        } else {
          setError("No users found.");
        }
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false); // Stop loading after fetching is done
      }
    };

    fetchUserData(); // Call the fetch function
  }, []);

  const validateForm = () => {
    if (!userData.fullName.trim()) {
      alert("Full Name is required.");
      return false;
    }
    if (!userData.email.includes("@")) {
      alert("Enter a valid email address.");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data:", userData);
    }
  };

  // Display loading or error message if needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.userManagement}>
      <div className={styles.info__content}>
        {/* Left Section */}
        <div className={styles.info__wrapper}>
          <form className={styles.info__form} onSubmit={handleSubmit}>
            <h2 className={styles.info__title}>Thông tin cá nhân</h2>

            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>
                ID (là trường bắt buộc)
              </label>
              <input
                className={styles.input}
                type="text"
                name="id"
                value={userData.id}
                onChange={handleChange}
                disabled
              />
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
              <label className={styles.info_label}>Công ty</label>
              <input
                className={styles.input}
                type="text"
                name="company"
                value={userData.company}
                onChange={handleChange}
              />
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

            <div className={styles.info__formGroup}>
              <label className={styles.info_label}>Tỉnh/thành phố</label>
              <select
                className={styles.select}
                name="city"
                value={userData.city}
                onChange={handleChange}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
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
              <p>Điểm tích lũy: {userData.points}</p>
              <a href="#" className={styles.pointsPolicyLink}>
                Xem chính sách tích lũy điểm
              </a>
              <p className={styles.expireDate}>
                Ngày tham gia: {userData.expireDate}
              </p>
            </div>

            <div className={styles.statsGrid}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
