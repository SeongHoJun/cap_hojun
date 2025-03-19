import React from 'react';

const DeleteButton = ({ onDelete }) => {
    return (
        <button onClick={onDelete} className="delete-btn">
            삭제
        </button>
    );
};

export default DeleteButton;
