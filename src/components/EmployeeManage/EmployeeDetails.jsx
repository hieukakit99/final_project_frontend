import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './EmployeeDetails.css';
import EmployeeImage from './EmployeeImage'
const EmployeeDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin nhân viên từ API
  useEffect(() => {
    axios
      .get(`https://67396618a3a36b5a62ee89b2.mockapi.io/Employee-Detail/${id}`) // Thay URL bằng API của bạn
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error('Error fetching employee details:', error));
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="employee-details">
      <Row>
        <Col className='align-self-center'>
          <EmployeeImage imageUrl={employee.avatar} name={employee.name}  />
        </Col>
        <Col md={8}>
          <h2>Thông tin nhân viên</h2>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Địa chỉ Email:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="email" value={employee.email} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Tên nhân viên:
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="text" value={employee.firstName} readOnly />
              </Col>
              <Col sm={4}>
                <Form.Control type="text" value={employee.lastName} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Ngày sinh:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.birthDate} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Địa chỉ:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.address} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Số điện thoại:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.phone} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Phòng ban:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" value={employee.department} readOnly />
              </Col>
            </Form.Group>

            <Button variant="danger" className="me-2">
              Xóa nhân viên
            </Button>

            <Button
              variant="primary" 
              onClick={() => navigate(`/edit-employee/${id}`) }
            >
              Chỉnh sửa thông tin nhân viên
            </Button>

            <Button variant="primary" onClick={() => navigate(`/employee-profile`)} className='ms-2'>
              Quay lại
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetails;