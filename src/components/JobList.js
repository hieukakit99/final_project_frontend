import React from 'react';

const JobList = ({ jobs, editJob, deleteJob }) => {
    return (
        <ul>
            {jobs.map(j => (
                <li key={j.id}>
                    {j.jobName} - {j.assignee} - Tình trạng: {j.status}
                    <button onClick={() => editJob(j.id)}>Sửa</button>
                    <button onClick={() => deleteJob(j.id)}>Xóa</button>
                </li>
            ))}
        </ul>
    );
};

export default JobList;