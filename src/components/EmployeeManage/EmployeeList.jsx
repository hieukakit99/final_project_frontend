import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EmployeeList.css";

const EmployeeList = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    axios
      .get("https://67396618a3a36b5a62ee89b2.mockapi.io/Employee-list")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : []; // Đảm bảo data là mảng
        setEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);
  // Lọc nhân viên theo từ khóa tìm kiếm
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="employee-list-container">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm nhân viên"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6} className="text-end">
          <Button variant="primary" onClick={() => navigate("/add-employee")}>
            Thêm Nhân Viên Mới
          </Button>
        </Col>
      </Row>

      <Row>
        {filteredEmployees.map((employee) => (
          <Col md={4} className="mb-3" key={employee.id}>
            <div
              className="employee-card"
              onClick={() => navigate(`/employee-details/${employee.id}`)} // Điều hướng đến trang chi tiết
              style={{ cursor: "pointer" }}
            >
              <div className="employee-image">
                <img src={employee.avatar} alt={employee.name} />
              </div>
              <p>{employee.name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EmployeeList;
