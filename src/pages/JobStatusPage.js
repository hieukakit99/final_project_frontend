import React, { useState } from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';

function JobStatusPage() {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({ id: null, jobName: '', status: '', jobInfo: '', assignee: '' });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const addJob = () => {
        setJobs([...jobs, { ...job, id: Date.now() }]);
        setJob({ id: null, jobName: '', status: '', jobInfo: '', assignee: '' });
    };

    const editJob = (id) => {
        const jobToEdit = jobs.find(j => j.id === id);
        setJob(jobToEdit);
        setIsEditing(true);
    };

    const updateJob = () => {
        setJobs(jobs.map(j => (j.id === job.id ? job : j)));
        setJob({ id: null, jobName: '', status: '', jobInfo: '', assignee: '' });
        setIsEditing(false);
    };

    const deleteJob = (id) => {
        setJobs(jobs.filter(j => j.id !== id));
    };

    return (
        <div>
            <JobForm 
                job={job} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
                addJob={addJob} 
                updateJob={updateJob}
            />
            <JobList 
                jobs={jobs} 
                editJob={editJob} 
                deleteJob={deleteJob}
            />
        </div>
    );
}

export default JobStatusPage;