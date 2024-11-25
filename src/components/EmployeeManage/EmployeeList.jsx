import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/employee-profiles", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.userName &&
      employee.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => navigate("/add-employee")}
          >
            Thêm Nhân Viên Mới
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <Col key={employee.profileId}>
              <Card
                className="h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/employee-details/${employee.profileId}`)
                }
              >
                <Card.Body>
                  <Card.Title className="mb-3">
                    {employee.userName || "Chưa cập nhật"}
                  </Card.Title>
                  <Card.Text>
                    <div className="d-flex justify-content-between">
                      <strong>Chức danh:</strong>
                      <span>{employee.jobTitle || "N/A"}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <strong>Phòng ban:</strong>
                      <span>{employee.departmentName || "N/A"}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <strong>Ngày thuê:</strong>
                      <span>{employee.hireDate || "N/A"}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <strong>Trạng thái:</strong>
                      <span
                        className={`badge ${
                          employee.status === "Active"
                            ? "bg-success"
                            : employee.status === "Inactive"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {employee.status || "N/A"}
                      </span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center">
              <Card.Body>Không tìm thấy nhân viên nào.</Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EmployeeList;
