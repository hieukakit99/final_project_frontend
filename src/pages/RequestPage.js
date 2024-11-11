import React, { useState } from 'react';
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';

function RequestPage() {
    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState({ id: null, name: '', sender: '', content: '', recipient: '' });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest({ ...request, [name]: value });
    };

    const addRequest = () => {
        setRequests([...requests, { ...request, id: Date.now() }]);
        setRequest({ id: null, name: '', sender: '', content: '', recipient: '' });
    };

    const editRequest = (id) => {
        const requestToEdit = requests.find(r => r.id === id);
        setRequest(requestToEdit);
        setIsEditing(true);
    };

    const updateRequest = () => {
        setRequests(requests.map(r => (r.id === request.id ? request : r)));
        setRequest({ id: null, name: '', sender: '', content: '', recipient: '' });
        setIsEditing(false);
    };

    const deleteRequest = (id) => {
        setRequests(requests.filter(r => r.id !== id));
    };

    return (
        <div>
            <RequestForm 
                request={request} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
                addRequest={addRequest} 
                updateRequest={updateRequest}
            />
            <RequestList 
                requests={requests} 
                editRequest={editRequest} 
                deleteRequest={deleteRequest}
            />
        </div>
    );
}

export default RequestPage;