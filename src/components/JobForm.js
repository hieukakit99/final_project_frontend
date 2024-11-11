import React from 'react';

const JobForm = ({ job, handleInputChange, isEditing, addJob, updateJob }) => {
    return (
        <div>
            <h2>{isEditing ? 'Sửa Công việc' : 'Thêm Công việc'}</h2>
            <input type="text" name="jobName" placeholder="Tên công việc" value={job.jobName} onChange={handleInputChange} />
            <select name="status" value={job.status} onChange={handleInputChange}>
                <option value="">Chọn tình trạng</option>
                <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
            </select>
            <textarea name="jobInfo" placeholder="Thông tin công việc" value={job.jobInfo} onChange={handleInputChange} />
            <input type="text" name="assignee" placeholder="Người thực hiện" value={job.assignee} onChange={handleInputChange} />
            <button onClick={isEditing ? updateJob : addJob}>{isEditing ? 'Cập nhật' : 'Thêm'}</button>
        </div>
    );
};

export default JobForm;