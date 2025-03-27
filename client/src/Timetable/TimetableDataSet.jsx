import React, { useEffect, useState } from "react";
import axios from "axios";
import "./timetable.css";
import "./TimetableMedia.css";
import { useNavigate } from "react-router-dom";
import TimetableGrid from "./TimetableGrid";

const TimetableDataSet = () => {
  const [timetables, setTimetables] = useState([]);
  const [removedLectures, setRemovedLectures] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/timetables");
        setTimetables(response.data);
      } catch (error) {
        console.error("시간표 데이터 가져오기 실패:", error);
        setTimetables([[], [], []]);
      }
    };
    fetchTimetables();
  }, []);

  useEffect(() => {
    if (timetables.length > 0) setIsRendered(true);
  }, [timetables]);

  useEffect(() => {
    if (isRendered) {
      const wrapper = document.querySelector(".tables-wrapper");
      if (wrapper) wrapper.scrollLeft = 0;
    }
  }, [isRendered]);

  const handleDeleteLecture = (timetableIndex, lectureId) => {
    setRemovedLectures((prev) => ({
      ...prev,
      [timetableIndex]: [...(prev[timetableIndex] || []), lectureId],
    }));
    setTimetables((prev) =>
      prev.map((table, i) =>
        i === timetableIndex ? table.filter((lec) => lec.title !== lectureId) : table
      )
    );
  };

  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/logo2.png" alt="계명대학교" className="logo" />
            <div className="logo-text">
              <span className="university-name-ko">계명대학교</span>
              <span className="university-name-en">KEIMYUNG UNIVERSITY</span>
            </div>
          </div>
        </div>
      </header>

      <main className="timetable-content">
        <div className="tables-wrapper">
          {timetables.map((timetable, index) => (
            <div className="timetable-container" key={index}>
              <h2>시간표 {index + 1}</h2>
              <TimetableGrid
                scheduleData={timetable}
                setScheduleData={(updated) =>
                  setTimetables((prev) =>
                    prev.map((table, i) => (i === index ? updated : table))
                  )
                }
                onDeleteLecture={(lectureId) => handleDeleteLecture(index, lectureId)}
              />
              <button
                className="timetable-button"
                onClick={() =>
                  navigate("/timetablecheck", {
                    state: { selectedTimetable: timetable },
                  })
                }
              >
                시간표 선택
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TimetableDataSet;
