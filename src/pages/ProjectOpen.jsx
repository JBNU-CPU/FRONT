import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import axios from "axios";

const Container = styled.div`
    width: calc(100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 100px;
    @media screen and (min-width : 700px) {
      width : calc(80%);
    }
    @media screen and (min-width : 1024px) {
      width : calc(60%);
    }
`;

const Subtitle = styled.div`
    color: #F5F7FF;
    font: 700 30px 'arial';
    margin: 60px 0 30px 0;
    @media screen and (min-width : 700px) {
      font: 700 50px 'arial';
    }
`;

const IntroTitle = styled.p`
    color: #F5F7FF;
    font: 700 14px 'arial';
    margin: 0 20px 10px 0;
    padding-left: 10px;
    cursor : default;
    @media screen and (min-width : 1024px) {
      font-size : 18px;
    }
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
    height: 130px;
    width: 100%; /* 부모의 100% 너비를 따름 */
    box-sizing: border-box; /* padding과 border가 width에 포함됨 */
    margin: 0; /* 외부 여백 제거 */
    @media screen and (min-width : 700px) {
      font-size : 14px;
      min-height : 120px;
    }
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
const TimeSelectTitle = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
`
const TimeBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    padding :20px 0 20px 0;
    border-bottom: 1px solid #424755;
`;

const Select = styled.select`
    padding: 5px;
    cursor : pointer;
    color : #BCC0CF;
    width : auto;
    align-items : center;
    border-radius : 15px;
    background-color : #1E1E1E;
    font-size: 10px;
    @media screen and (min-width : 700px) {
        font-size : 14px;
        height : 35px;
        margin: 5px 0 5px 0;
    }
    &:hover {
        border: 1px solid #F5F7FF;;
    }    
`;

const Button = styled.button`
  cursor: pointer;
  padding : 5px 10px;
`;

const AddButton = styled(Button)`
  background-color: #ab1a65;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin: 10px 0 0 10px;
  &:hover {
    background-color: #8c1453; /* hover 시 어두운 색으로 변경 */
    color : #BCC0CF;
    transform: scale(0.95);
  }
`;

const RemoveButton = styled(Button)`
  background-color: #6f7486;
  color: white;
  border: none;
  border-radius: 30px;
  margin: 0 10px 0 10px;
  font-weight : bold;
  &:hover {
    background-color: #424755; /* hover 시 어두운 색으로 변경 */
    color : white;
    transform: scale(0.95);
  }
`;

//00:00 ~ 23:30, 30분 단위로 시간 생성 함수
const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ["00", "30"]) {
        times.push(`${hour.toString().padStart(2, "0")}:${minute}`);
      }
    }
    return times;
  };

const StudyOpen = () => {
    // State 관리
    const [sectionName, setSectionName] = useState("");
    const [activityIntro, setActivityIntro] = useState("");
    const [techStack, setTechStack] = useState("");
    const [location, setLocation] = useState("");
    const [maxMembers, setMaxMembers] = useState("");
    const [leader, setLeader] = useState("");
    const [etc, setEtc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    const [schedule, setSchedule] = useState([]); // 요일, 시작시간, 종료시간 저장
    const timeOptions = generateTimeOptions(); // 30분 단위 시간 목록

    const addSchedule = () => {
        setSchedule([...schedule, { day: "월요일", startTime: "", endTime: "" }]);
    };

    const removeSchedule = (index) => {
        setSchedule(schedule.filter((_, i) => i !== index));
    };

    const updateSchedule = (index, key, value) => {
        const newSlots = [...schedule];
        newSlots[index][key] = value;

        // 종료시간이 시작시간보다 빠르면 자동 조정
        if (key === "startTime" && newSlots[index].endTime <= value) {
        const nextValidEndTime = getNextValidEndTime(value);
        newSlots[index].endTime = nextValidEndTime;
        }
        setSchedule(newSlots);
    };
    // 시작 시간 이후 가장가까운 시간 선택
    const getNextValidEndTime = (startTime) => {
        const index = timeOptions.indexOf(startTime);
        return timeOptions[index + 1] || startTime; // 다음 시간 선택, 없으면 유지
    };
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
            studyType: "project", // 필요에 따라 수정
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
            
            console.log("프로젝트 개설 성공:", response.data);
            setSuccess("프로젝트가 성공적으로 개설되었습니다!");
        } catch (err) {
            console.error("프로젝트 개설 중 오류 발생:", err);
            setError("프로젝트 개설 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container>
                <Subtitle>프로젝트 개설</Subtitle>
                <IntroWrapper>
                    <IntroTitle>프로젝트 명</IntroTitle>
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
                    <TimeSelectTitle>
                        <IntroTitle>진행일시</IntroTitle>
                    </TimeSelectTitle>
                    {schedule.map((slot, index) => (
                        <TimeBlock key={index}>
                            <Select value={slot.day} onChange={(e) => updateSchedule(index, "day", e.target.value)}>
                                {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                                ))}
                            </Select>

                            <Select 
                                value={slot.startTime} 
                                onChange={(e) => updateSchedule(index, "startTime", e.target.value)}
                            >
                                <option value="" disabled>시작시간</option> 
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </Select>
                            <Select 
                                value={slot.endTime} 
                                onChange={(e) => updateSchedule(index, "endTime", e.target.value)}
                            >
                                <option value="" disabled>종료시간</option> 
                                {timeOptions
                                    .filter((time) => time > slot.startTime) // 시작시간 이후의 값만 표시
                                    .map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                ))}
                            </Select>
                            <RemoveButton onClick={() => removeSchedule(index)}>-</RemoveButton>
                        </TimeBlock>
                        
                    ))}
                    <AddButton onClick={addSchedule}>추가</AddButton>
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
                    <IntroTitle>팀장</IntroTitle>
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
                {loading && <p style={{ color: "white" }}>프로젝트 개설 중...</p>}
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
