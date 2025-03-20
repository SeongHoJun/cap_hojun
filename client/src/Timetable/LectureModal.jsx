import React, { useState } from "react";
import "./TimetableModal.css";

const LectureModal = ({
  isOpen,
  lecture,
  onClose,
  onDelete,
  onProfessorChange,
}) => {
  const [isEditingProfessor, setIsEditingProfessor] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(
    lecture?.instructor
  );

  if (!isOpen || !lecture) return null;

  const handleProfessorChange = (classId, newProfessor) => {
    setSelectedProfessor(newProfessor);
  };

  const handleSaveProfessor = () => {
    onProfessorChange(lecture.title, selectedProfessor);
    setIsEditingProfessor(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{lecture.title}</h2>

        <p>
          <strong>교수:</strong>
          {!isEditingProfessor ? (
            <>
              {lecture.instructor}
              <button className="modal-edit-btn">교수 변경</button>
            </>
          ) : (
            <>
              <ProfessorSelect
                classId={lecture.title}
                professorList={lecture.professorList}
                selectedProfessor={selectedProfessor}
                onProfessorChange={handleProfessorChange}
              />
              <button className="modal-save-btn" onClick={handleSaveProfessor}>
                저장
              </button>
            </>
          )}
        </p>

        <p>
          <strong>시간:</strong> {lecture.startTime} - {lecture.endTime}
        </p>
        <p>
          <strong>요일:</strong> {lecture.day}
        </p>

        <div className="modal-buttons">
          <button className="modal-confirm-btn" onClick={onClose}>
            확인
          </button>
          <button
            onClick={() => onDelete(lecture.title)}
            className="delete-btn"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureModal;
