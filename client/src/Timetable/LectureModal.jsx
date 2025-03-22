import React, { useState, useEffect } from "react";
import "./TimetableModal.css";

const LectureModal = ({
  isOpen,
  lecture,
  onClose,
  onDelete,
  onProfessorChange,
}) => {
  const [isEditingProfessor, setIsEditingProfessor] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState("");

  useEffect(() => {
    if (lecture?.instructor) {
      setSelectedProfessor(lecture.instructor);
      setIsEditingProfessor(false);
    }
  }, [lecture]);

  if (!isOpen || !lecture) return null;

  const baseProfessorName = lecture?.instructor || "홍길동";
  const professorList =
    Array.isArray(lecture.professorList) && lecture.professorList.length > 0
      ? lecture.professorList
      : generateDummyProfessors(baseProfessorName);

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

        <div className="professor-row">
          <span className="info-label">교수 :</span>
          {!isEditingProfessor ? (
            <div className="professor-inline">
              <span className="professor-name">{selectedProfessor}</span>
              <button
                className="modal-edit-btn"
                onClick={() => setIsEditingProfessor(true)}
              >
                교수 변경
              </button>
            </div>
          ) : (
            <div className="professor-inline">
              <select
                className="modal-select"
                value={selectedProfessor}
                onChange={(e) =>
                  handleProfessorChange(lecture.title, e.target.value)
                }
              >
                {professorList.map((prof, idx) => (
                  <option key={idx} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
              <button className="modal-save-btn" onClick={handleSaveProfessor}>
                저장
              </button>
            </div>
          )}
        </div>

        <div className="info-row">
          <span className="info-label">시간 :</span>
          <span className="info-value">
            {lecture.startTime} - {lecture.endTime}
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">요일 :</span>
          <span className="info-value">{lecture.day}</span>
        </div>

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

const generateDummyProfessors = (baseName) => {
  const base = baseName || "홍길동";
  return [base, `${base}A`, `${base}B`, `${base}C`];
};

export default LectureModal;
