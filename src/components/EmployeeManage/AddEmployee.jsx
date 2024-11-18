import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    address: '',
    department: '',
    avatar: '', // URL hình ảnh
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://67396618a3a36b5a62ee89b2.mockapi.io/Employee-list', employee);
      alert('Nhân viên đã được thêm thành công!');
      navigate('/employee-profile'); // Quay về danh sách nhân viên
    } catch (error) {
      console.error('Lỗi khi thêm nhân viên:', error);
      alert('Đã xảy ra lỗi khi thêm nhân viên.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Thêm Nhân Viên Mới</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ"
                name="address"
                value={employee.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="department">
              <Form.Label>Phòng ban</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phòng ban"
                name="department"
                value={employee.department}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="avatar">
              <Form.Label>Ảnh đại diện (URL)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập URL ảnh đại diện"
                name="avatar"
                value={employee.avatar}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Lưu Nhân Viên
        </Button>
        <Button
          variant="secondary"
          className="ms-3"
          onClick={() => navigate('/employee-profile')}
        >
          Quay lại
        </Button>
      </Form>
    </Container>
  );
};

export default AddEmployee;
