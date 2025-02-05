import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import axios from "axios";

const Container = styled.div`
    width: calc(60%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 60px;
`;

const Subtitle = styled.div`
    color: #BCC0CF;
    font: 700 50px 'arial';
`;

const IntroTitle = styled.p`
    color: white;
    font: 700 14px 'arial';
    margin: 0 20px 10px 20px;
    padding-left: 10px;
`;

const IntroWrapper = styled.div`
    margin-top: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
`;

const IntroInput = styled.textarea`
    font: 400 12px 'arial';
    color: #BCC0CF;
    padding: 10px;
    background-color: #1E1E1E;
    border: 1px solid #6F7486;
    border-radius: 8px;
    resize: none;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
`;

const DayButton = styled.button`
    font: 400 12px 'arial';
    margin: 5px 25px;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? '#ab1a65' : '#1E1E1E')};
    color: ${({ isSelected }) => (isSelected ? 'white' : '#BCC0CF')};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#ab1a65' : '#6F7486')};
    }
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const NumberInput = styled.input`
    font: 400 12px 'arial';
    color: #BCC0CF;
    padding: 10px;
    background-color: #1E1E1E;
    border: 1px solid #6F7486;
    border-radius: 8px;
    resize: none;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    text-align: center;
`;

const ApplicateButton = styled.button`
    width: 100px;
    height: 35px;
    background: #ab1a65;
    border: none;
    color: white;
    margin-top: 50px;
    font: 500 15px 'arial';
    border-radius: 12px;
    margin-bottom: 100px;
    cursor: pointer;
`;

const StudyOpen = () => {
    // State 관리
    const [sectionName, setSectionName] = useState("");
    const [activityIntro, setActivityIntro] = useState("");
    const [techStack, setTechStack] = useState("");
    const [schedule, setSchedule] = useState([]); // 선택된 요일을 저장
    const [location, setLocation] = useState("");
    const [maxMembers, setMaxMembers] = useState("");
    const [leader, setLeader] = useState("");
    const [etc, setEtc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // 요일 선택 핸들러
    const toggleDay = (day) => {
        setSchedule((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    // 요일을 영어로 변환하는 함수
    const convertDaysToEnglish = (days) => {
        const dayMapping = {
            "월요일": "MON",
            "화요일": "TUE",
            "수요일": "WED",
            "목요일": "THU",
            "금요일": "FRI",
            "토요일": "SAT",
            "일요일": "SUN",
        };
        return days.map((day) => dayMapping[day] || day);
    };

    // 스터디 개설 요청
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const requestData = {
            id: 0,
            memberId: 0,
            studyName: sectionName,
            studyType: "study", // 필요에 따라 수정
            maxMembers: parseInt(maxMembers, 10),
            studyDescription: activityIntro,
            techStack: techStack,
            studyDays: convertDaysToEnglish(schedule),
            location: location,
            etc: etc,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/study`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("스터디 개설 성공:", response.data);
            setSuccess("스터디가 성공적으로 개설되었습니다!");
        } catch (err) {
            console.error("스터디 개설 중 오류 발생:", err);
            setError("스터디 개설 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container>
                <Subtitle>스터디 개설</Subtitle>

                <IntroWrapper>
                    <IntroTitle>세션 명</IntroTitle>
                    <IntroInput
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        placeholder="예) React 점프하기"
                    />
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>활동소개</IntroTitle>
                    <IntroInput
                        value={activityIntro}
                        onChange={(e) => setActivityIntro(e.target.value)}
                        placeholder="예) React도 배우고 CPU 웹도 보수하고!"
                    />
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>기술스택</IntroTitle>
                    <IntroInput
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        placeholder="예) JS"
                    />
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>진행요일</IntroTitle>
                    <ButtonContainer>
                        {days.map((day) => (
                            <DayButton
                                key={day}
                                isSelected={schedule.includes(day)}
                                onClick={() => toggleDay(day)}
                            >
                                {day}
                            </DayButton>
                        ))}
                    </ButtonContainer>
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>진행장소</IntroTitle>
                    <IntroInput
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="예) 상시 변동"
                    />
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>최대인원</IntroTitle>
                    <NumberInput
                        type="number"
                        value={maxMembers}
                        onChange={(e) => setMaxMembers(e.target.value)}
                        min="1"
                        placeholder="최대 인원을 입력하세요"
                    />
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>세션장</IntroTitle>
                    <IntroInput
                        value={leader}
                        onChange={(e) => setLeader(e.target.value)}
                        placeholder="예) 홍길동"
                    />
                </IntroWrapper>

                <IntroWrapper>
                    <IntroTitle>기타</IntroTitle>
                    <IntroInput
                        value={etc}
                        onChange={(e) => setEtc(e.target.value)}
                        placeholder="예) 노트북 필수!"
                    />
                </IntroWrapper>

                {loading && <p style={{ color: "white" }}>스터디 개설 중...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <ApplicateButton onClick={handleSubmit} disabled={loading}>
                    개설하기
                </ApplicateButton>
            </Container>
            <Footer />
        </>
    );
};

export default StudyOpen;
