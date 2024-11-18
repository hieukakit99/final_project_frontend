import React, {useState,useEffect} from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Pagination } from 'react-bootstrap';
import './Homepage.css';
import NotificationList from './NotificationList';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null)
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate("/")
  }
  const notifications = [
    {
      sender: "Hệ thống",
      title: "Cập nhật phần mềm",
      content: "Hệ thống sẽ cập nhật phiên bản mới vào lúc 22:00 tối.",
      time: "Hôm nay, 07:51",
    },
    {
      sender: "Phòng Nhân sự",
      title: "Thông báo nghỉ lễ",
      content: "Công ty sẽ nghỉ lễ từ ngày 25/12 đến 01/01.",
      time: "10 thg 11",
    },
  ]

  useEffect(() => {


      axios
      .get(`https://67371888aafa2ef222329aa5.mockapi.io/login/${id}`) 
      .then((response) => setUserData(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  return (
    <div className="homepage">


      {/* Main Content */}
      <Container fluid className="main-content">
        <Row>
          <Col >
            {/* Content Area */}
            <div className="main-content">
                <h2>News</h2>
                <NotificationList notifications={notifications} />
            </div>

            {/* Pagination */}
            <div className="pagination-container mt-4">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </div>

            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;