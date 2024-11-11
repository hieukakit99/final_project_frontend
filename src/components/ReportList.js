import React from 'react';

const ReportList = ({ reports, editReport, deleteReport }) => {
    return (
        <ul>
            {reports.map(r => (
                <li key={r.id}>
                    {r.name} - {r.sender}
                    <button onClick={() => editReport(r.id)}>Sửa</button>
                    <button onClick={() => deleteReport(r.id)}>Xóa</button>
                </li>
            ))}
        </ul>
    );
};

export default ReportList;