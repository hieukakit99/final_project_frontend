import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./EmployeeDetails.css";
import EmployeeImage from "./EmployeeImage";
import api from "../../api/apiClient";

const EmployeeDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin nhân viên từ API
  useEffect(() => {
    api
      .get(`http://localhost:8080/api/v1/employee-profiles/${id}`) // Thay URL bằng API của bạn
      .then((response) => setEmployee(response.data))
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="employee-details">
      <Row>
        <Col className="align-self-center">
          <EmployeeImage imageUrl={employee.avatar} name={employee.name} />
        </Col>
        <Col md={8}>
          <h2>Thông tin nhân viên</h2>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                ID:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="email" value={employee.userId} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Tên nhân viên:
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" value={employee.userName} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Ngày tuyển dụng:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.hireDate} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Tên công việc:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.jobTitle} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Trạng thái:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.status} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Phòng ban:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={employee.departmentName}
                  readOnly
                />
              </Col>
            </Form.Group>

            <Button variant="danger" className="me-2">
              Xóa nhân viên
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate(`/edit-employee/${id}`)}
            >
              Chỉnh sửa thông tin nhân viên
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate(`/employee-profile`)}
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

export default EmployeeDetails;
