import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './timetable.css';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import TimetableGrid from './TimetableGrid';

const TimetableDataSet = () => {
    const [timetables, setTimetables] = useState([]);
    const [removedLectures, setRemovedLectures] = useState({}); // ✅ 삭제된 강의를 각 시간표별로 관리
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/timetables');
                console.log('받아온 시간표 데이터:', response.data);
                setTimetables(response.data);
            } catch (error) {
                console.error('시간표 데이터 가져오기 실패:', error);
                setTimetables([[], [], []]);
            }
        };

        fetchTimetables();
    }, []);

    // ✅ 강의 삭제 기능 (각 시간표별 삭제된 강의 ID 저장)
    const handleDeleteLecture = (timetableIndex, lectureId) => {
        setRemovedLectures((prev) => ({
            ...prev,
            [timetableIndex]: [...(prev[timetableIndex] || []), lectureId],
        }));

        // ✅ 해당 시간표에서 강의 제거 후 상태 업데이트
        setTimetables((prevTimetables) =>
            prevTimetables.map((timetable, index) =>
                index === timetableIndex
                    ? timetable.filter((lecture) => lecture.id !== lectureId)
                    : timetable
            )
        );
    };

    // ✅ 시간표 선택 시 삭제된 강의 반영
    const handleTimetableSelect = (selectedTimetable, index) => {
        const filteredTimetable = selectedTimetable.filter(
            (lecture) => !(removedLectures[index] || []).includes(lecture.id)
        );
        navigate('/timetablecheck', { state: { selectedTimetable: filteredTimetable } });
    };

    return (
        <Layout>
            <main className="timetable-content">
                <div className="tables-wrapper">
                    {timetables.map((timetable, index) => (
                        <div className="timetable-container" key={index}>
                            <h2>시간표 {index + 1}</h2>
                            <TimetableGrid 
                                scheduleData={timetable}
                                onDeleteLecture={(lectureId) => handleDeleteLecture(index, lectureId)}
                            />
                            
                            <button 
                                className="timetable-button"
                                onClick={() => handleTimetableSelect(timetable, index)}
                            >
                                시간표 선택
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    );
};

export default TimetableDataSet;
