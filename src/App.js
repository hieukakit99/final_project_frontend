import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Chú ý thay đổi ở đây
import RequestPage from './pages/RequestPage';
import ReportPage from './pages/ReportPage';
import JobStatusPage from './pages/JobStatusPage';

function App() {
    return (
        <Router>
            <div>
                <Routes> {/* Thay Switch thành Routes */}
                    <Route path="/requests" element={<RequestPage />} /> {/* Sử dụng element thay vì component */}
                    <Route path="/reports" element={<ReportPage />} />
                    <Route path="/jobs" element={<JobStatusPage />} />
                    <Route path="/" element={<h1>Welcome to the Management System</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;