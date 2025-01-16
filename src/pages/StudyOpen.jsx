import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    width: 100%; /* calc 제거 */
    box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
    padding: 0 20px; /* 양쪽 여백 추가 */
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
    width: 100%; /* 부모의 100% 너비를 따름 */
    box-sizing: border-box; /* padding과 border가 width에 포함됨 */
    margin: 0; /* 외부 여백 제거 */
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
    width: 100%; /* 부모의 100% 너비를 따름 */
    box-sizing: border-box; /* padding과 border가 width에 포함됨 */
    margin: 0; /* 외부 여백 제거 */
    text-align: center; /* 숫자가 중앙에 정렬되도록 설정 */
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

    // 요일 선택 핸들러
    const toggleDay = (day) => {
        setSchedule((prev) => 
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    return (
        <>
            <Header />
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

                <ApplicateButton>개설하기</ApplicateButton>
            </Container>
            <Footer />
        </>
    );
};

export default StudyOpen;
