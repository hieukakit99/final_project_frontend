import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/apiClient";

const EditEmployee = () => {
  const { id } = useParams(); // Lấy ID nhân viên từ URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null); // Trạng thái lưu thông tin nhân viên
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [avatar, setAvatar] = useState(""); // Ảnh đại diện

  // Lấy thông tin nhân viên từ API khi component được render
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/api/v1/employee-profiles/${id}`);
        setEmployee(response.data);
        setAvatar(response.data.avatar || ""); // Gán ảnh đại diện (nếu có)
      } catch (err) {
        console.error("Error fetching employee details:", err);
        setError("Không thể tải thông tin nhân viên.");
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>; // Hiển thị trạng thái loading khi dữ liệu chưa tải xong
  }

  // Lưu thông tin nhân viên sau khi chỉnh sửa
  const handleSave = async () => {
    setLoading(true);
    setError("");
    const updatedEmployee = { ...employee, avatar }; // Dữ liệu được cập nhật

    try {
      await api.put(`/api/v1/employee-profiles/${id}`, updatedEmployee);
      alert("Thông tin nhân viên đã được cập nhật!");
      navigate("/employee-profile"); // Điều hướng về danh sách nhân viên
    } catch (err) {
      console.error("Error saving employee details:", err);
      setError("Không thể lưu thông tin nhân viên. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xóa nhân viên
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa nhân viên này không?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    setError("");

    try {
      await api.delete(`/api/v1/employee-profiles/${id}`);
      alert("Nhân viên đã được xóa thành công!");
      navigate("/employee-profile"); // Điều hướng về danh sách nhân viên
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Không thể xóa nhân viên. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi ảnh đại diện
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh mới
  };

  return (
    <div>
      <h2>Chỉnh sửa thông tin nhân viên</h2>
      {error && <p className="text-danger">{error}</p>} {/* Hiển thị lỗi nếu có */}

      <div>
        <div>
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label>ID:</label>
          <input type="text" value={employee.userId} readOnly />
        </div>

        <div>
          <label>Họ và Tên:</label>
          <input
            type="text"
            value={employee.userName || ""}
            onChange={(e) =>
              setEmployee({ ...employee, userName: e.target.value })
            }
          />
        </div>

        <div>
          <label>Ngày tuyển dụng:</label>
          <input
            type="date"
            value={employee.hireDate || ""}
            onChange={(e) =>
              setEmployee({ ...employee, hireDate: e.target.value })
            }
          />
        </div>

        <div>
          <label>Tên công việc:</label>
          <input
            type="text"
            value={employee.jobTitle || ""}
            onChange={(e) =>
              setEmployee({ ...employee, jobTitle: e.target.value })
            }
          />
        </div>

        <div>
          <label>Trạng thái:</label>
          <select
            value={employee.status || ""}
            onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
          >
            <option value="">Chọn trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Inactive">Ngưng hoạt động</option>
          </select>
        </div>

        <div>
          <label>Phòng ban:</label>
          <input
            type="text"
            value={employee.departmentName || ""}
            onChange={(e) =>
              setEmployee({ ...employee, departmentName: e.target.value })
            }
          />
        </div>

        <div>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Lưu thông tin"}
          </button>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Xóa nhân viên"}
          </button>
          <button onClick={() => navigate("/employee-profile")}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
