import React from 'react';

const ReportForm = ({ report, handleInputChange, isEditing, addReport, updateReport }) => {
    return (
        <div>
            <h2>{isEditing ? 'Sửa Báo cáo' : 'Thêm Báo cáo'}</h2>
            <input type="text" name="name" placeholder="Tên báo cáo" value={report.name} onChange={handleInputChange} />
            <input type="text" name="sender" placeholder="Người gửi" value={report.sender} onChange={handleInputChange} />
            <textarea name="content" placeholder="Nội dung báo cáo" value={report.content} onChange={handleInputChange} />
            <input type="text" name="recipient" placeholder="Gửi đến" value={report.recipient} onChange={handleInputChange} />
            <button onClick={isEditing ? updateReport : addReport}>{isEditing ? 'Cập nhật' : 'Thêm'}</button>
        </div>
    );
};

export default ReportForm;