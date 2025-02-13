import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import AdminContext from "../AdminContext";

const Container = styled.div`
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 100px auto 50px auto;
    padding: 0;
`;

const Subtitle = styled.div`
    color: #BCC0CF;
    font: 700 14px 'arial';
    margin-left: 20px;
`;

const HeadWrapper = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #6F7486;
`;

const MainTitle = styled.p`
    font: 700 20px 'arial';
    color: white;
    margin-left: 20px;
`;

const RecuruitState = styled.p`
    width: 50px;
    height: 20px;
    border: 1px solid #ab1a65;
    border-radius: 15px;
    color: white;
    font: 500 10px 'arial';
    text-align: center;
    line-height: 20px;
    margin-right: 20px;
`;

const IntroWrapper = styled.div`
    margin-top: 40px;
`;

const IntroTitle = styled.p`
    color: white;
    font: 700 14px 'arial';
    margin: 0 20px 10px 20px;
`;

const IntroContent = styled.p`
    font: 400 12px 'arial';
    color: #BCC0CF;
    margin: 0 25px;
`;

const ButtonContainer = styled.div`
    border-top: 1px solid gray;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
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

const DeleteButton = styled.button`
    width: 100px;
    height: 35px;
    background: red;
    border: none;
    color: white;
    font: 500 15px 'arial';
    border-radius: 12px;
    margin-left: 20px;
    margin-top: 50px;
`

const Studyinfo = () => {
    const { id } = useParams();
    const [studyInfo, setStudyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userId");
    
    const {isAdmin} = useContext(AdminContext);

    useEffect(() => {
        const fetchStudyInfo = async () => {
            try {
                const response = await axios.get(`https://api.jbnucpu.co.kr/study/${id}`, {
                    withCredentials: true,
                });
                console.log('info');
                console.log(userId, response.data.memberId);
                console.log(response.data);
                setStudyInfo(response.data);
            } catch (err) {
                setError("스터디 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudyInfo();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://api.jbnucpu.co.kr/study/${id}`, {
                withCredentials: true,
            });
            alert("스터디가 삭제되었습니다.");
        } catch (err) {
            alert("스터디 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleApply = async() => {
        try{
            const response = await axios.post(
                `https://api.jbnucpu.co.kr/study/${id}/apply`,
                {withCredentials: true}
            );
            alert('스터디 신청이 완료되었습니다');
        }catch(err){
            alert('스터디 신청 중 오류 ㅂ라생')
        }
    }

    if (loading) {
        return <p style={{ color: "white", textAlign: "center" }}>스터디 정보를 불러오는 중...</p>;
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    return (
        <>
            <Container>
                <Subtitle>세션</Subtitle>
                <HeadWrapper>
                    <MainTitle>{studyInfo?.studyName || "스터디 이름 없음"}</MainTitle>
                    <RecuruitState>모집중</RecuruitState>
                </HeadWrapper>
                <IntroWrapper>
                    <IntroTitle>활동소개</IntroTitle>
                    <IntroContent>{studyInfo?.studyDescription || "설명이 없습니다."}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기술스택</IntroTitle>
                    <IntroContent>{studyInfo?.techStack || "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행요일</IntroTitle>
                    <IntroContent>{studyInfo?.studyDays?.join(" / ") || "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행장소</IntroTitle>
                    <IntroContent>{studyInfo?.location || "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>최대인원</IntroTitle>
                    <IntroContent>{studyInfo?.maxMembers || "미정"}명</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>세션장</IntroTitle>
                    <IntroContent>{studyInfo?.memberId ? `ID: ${studyInfo.memberId}` : "미정"}</IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기타</IntroTitle>
                    <IntroContent>{studyInfo?.etc || "없음"}</IntroContent>
                </IntroWrapper>
                <ButtonContainer>
                {studyInfo && (((Number(userId) === studyInfo.memberId)||isAdmin) ? 
                        (<DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>) 
                        : 
                        (<ApplicateButton onClick={handleApply}>신청하기</ApplicateButton>)
                    )}
                </ButtonContainer> 
            </Container>
            <Footer />
        </>
    );
};

export default Studyinfo;