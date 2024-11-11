import React from 'react';

const RequestList = ({ requests, editRequest, deleteRequest }) => {
    return (
        <ul>
            {requests.map(r => (
                <li key={r.id}>
                    {r.name} - {r.sender}
                    <button onClick={() => editRequest(r.id)}>Sửa</button>
                    <button onClick={() => deleteRequest(r.id)}>Xóa</button>
                </li>
            ))}
        </ul>
    );
};

export default RequestList;