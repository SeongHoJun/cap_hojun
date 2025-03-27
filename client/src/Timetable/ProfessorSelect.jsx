import React from 'react';

const ProfessorSelect = ({ classId, professorList, selectedProfessor, onProfessorChange }) => {
    return (
        <select
            value={selectedProfessor}
            onChange={(e) => onProfessorChange(classId, e.target.value)}
            autoFocus
        >
            {professorList.map((prof) => (
                <option key={prof} value={prof}>
                    {prof}
                </option>
            ))}
        </select>
    );
};

export default ProfessorSelect;