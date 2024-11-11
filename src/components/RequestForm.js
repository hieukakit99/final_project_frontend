import React from 'react';

const RequestForm = ({ request, handleInputChange, isEditing, addRequest, updateRequest }) => {
    return (
        <div>
            <h2>{isEditing ? 'Sửa Yêu cầu' : 'Thêm Yêu cầu'}</h2>
            <input type="text" name="name" placeholder="Tên yêu cầu" value={request.name} onChange={handleInputChange} />
            <input type="text" name="sender" placeholder="Người gửi" value={request.sender} onChange={handleInputChange} />
            <textarea name="content" placeholder="Nội dung" value={request.content} onChange={handleInputChange} />
            <input type="text" name="recipient" placeholder="Gửi đến" value={request.recipient} onChange={handleInputChange} />
            <button onClick={isEditing ? updateRequest : addRequest}>{isEditing ? 'Cập nhật' : 'Thêm'}</button>
        </div>
    );
};

export default RequestForm;