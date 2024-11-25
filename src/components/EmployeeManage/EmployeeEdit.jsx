import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./EmployeeEdit.css";

const EditEmployee = () => {
  const { id } = useParams(); // Lấy id nhân viên từ URL
  const [employee, setEmployee] = useState({
    id: id,
    avatar: "https://via.placeholder.com/150",
    email: "employee@example.com",
    name: "Nguyen Van A",
    birthDate: "1990-01-01",
    address: "123 ABC, Hà Nội",
    phone: "0123456789",
    department: "Kỹ thuật",
  });
  const navigate = useNavigate();

  //   useEffect(() => {
  //     axios
  //       .get(`https://mockapi.io/projects/123456/employees/${id}`) // Thay bằng URL API của bạn
  //       .then((response) => setEmployee(response.data))
  //       .catch((error) => console.error('Error fetching employee details:', error));
  //   }, [id]);

  //   const handleSave = () => {
  //     const updatedEmployee = { ...employee, avatar }; // Cập nhật thông tin và ảnh
  //     axios
  //       .put(`https://mockapi.io/projects/123456/employees/${id}`, updatedEmployee) // Thay bằng URL API của bạn
  //       .then(() => navigate(`/employee-details/${id}`))
  //       .catch((error) => console.error('Error saving employee details:', error));
  //   };

  const [avatar, setAvatar] = useState(employee.avatar); // Dùng để lưu ảnh mới

  const handleSave = () => {
    // Hiện thông báo để mô phỏng lưu dữ liệu
    alert("Thông tin đã được lưu tạm thời!");
    navigate(`/employee-details/${id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh mới
  };

  return (
    <Container className="edit-employee">
      <h2>Chỉnh sửa thông tin nhân viên</h2>
      <Row className="edit-container">
        <Col md={4}>
          <div className="edit-avatar">
            <img src={avatar} alt="Avatar" className="edit-avatar-image" />
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-3"
            />
          </div>
        </Col>
        <Col md={8}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Địa chỉ Email:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Họ và Tên:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Ngày sinh:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  value={employee.birthDate}
                  onChange={(e) =>
                    setEmployee({ ...employee, birthDate: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Địa chỉ:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={employee.address}
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Số điện thoại:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={employee.phone}
                  onChange={(e) =>
                    setEmployee({ ...employee, phone: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Phòng ban:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={employee.department}
                  onChange={(e) =>
                    setEmployee({ ...employee, department: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Button variant="success" onClick={handleSave}>
              Lưu thông tin thay đổi
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/employee-details/${id}`)}
              className="ms-2"
            >
              Quay lại
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEmployee;
