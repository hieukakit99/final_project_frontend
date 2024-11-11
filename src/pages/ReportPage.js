import React, { useState } from 'react';
import ReportForm from '../components/ReportForm';
import ReportList from '../components/ReportList';

function ReportPage() {
    const [reports, setReports] = useState([]);
    const [report, setReport] = useState({ id: null, name: '', sender: '', content: '', recipient: '' });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReport({ ...report, [name]: value });
    };

    const addReport = () => {
        setReports([...reports, { ...report, id: Date.now() }]);
        setReport({ id: null, name: '', sender: '', content: '', recipient: '' });
    };

    const editReport = (id) => {
        const reportToEdit = reports.find(r => r.id === id);
        setReport(reportToEdit);
        setIsEditing(true);
    };

    const updateReport = () => {
        setReports(reports.map(r => (r.id === report.id ? report : r)));
        setReport({ id: null, name: '', sender: '', content: '', recipient: '' });
        setIsEditing(false);
    };

    const deleteReport = (id) => {
        setReports(reports.filter(r => r.id !== id));
    };

    return (
        <div>
            <ReportForm 
                report={report} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
                addReport={addReport} 
                updateReport={updateReport}
            />
            <ReportList 
                reports={reports} 
                editReport={editReport} 
                deleteReport={deleteReport}
            />
        </div>
    );
}

export default ReportPage;