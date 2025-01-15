import React,{useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
// 그냥 서버에서 바로가져오는게 나을듯? 아니면 prop로 value들 넘겨주기

const Container = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    margin-left: 20%;
    margin-right: 20%;
`

const Subtitle = styled.div`
    color: #BCC0CF;
    font: 700 14px 'arial';
    margin-left: 20px;
`

const HeadWrapper = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #6F7486;
`

const MainTitle = styled.p`
    font: 700 20px 'arial';
    color: white;
    margin-left: 20px;
`

const RecuruitState = styled.p`
    width: 50px;
    height: 20px;
    border: 1px solid #EA0079;
    border-radius: 15px;
    color: white;
    font: 500 10px 'arial';
    text-align: center;
    line-height: 20px;
    margin-right: 20px;
`

const IntroWrapper = styled.div`
    margin: 0;
    padding: 0;
    margin-top: 40px;
`

const IntroTitle = styled.p`
    color: white;
    font: 700 14px 'arial';
    margin: 0;
    padding: 0;
    margin: 0 20px 10px 20px;
`

const IntroContent = styled.p`
    font: 400 12px 'arial';
    color:#BCC0CF;
    margin: 0;
    padding: 0;
    margin: 0 25px 0 25px;
`

const ButtonContainer = styled.div`
    border-top: 1px solid gray;
    margin: 0;
    padding: 0;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ApplicateButton = styled.button`
    width: 100px;
    height: 35px;
    background: #EA0079;
    border: none;
    color: white;
    margin: 0;
    padding: 0;
    margin-top: 50px;
    font: 500 15px 'arial';
    border-radius: 12px;
    margin-bottom: 100px;
`
    
const Project = () => {
    return(
        <>
            <Header/>
            <Container>
                <Subtitle>세션</Subtitle>
                <HeadWrapper>
                    <MainTitle>C언어 스터디</MainTitle>
                    <RecuruitState>모집중</RecuruitState>
                </HeadWrapper>
                <IntroWrapper>
                    <IntroTitle>활동소개</IntroTitle>
                    <IntroContent> 저희 스터디는 백준, 프로그래머스 등의 온라인 사이트에
                                    기재된 여러 알고리즘 문제들을 풀어보며 코딩 테스트를
                                    준비하는 스터디입니다.
                                    저희 스터디는 꾸준함을 가장 중요한 역량으로 생각하고
                                    있습니다! 교재가 파이썬 기반이라 파이썬으로 코딩 테스트를
                                    보실 분들께 권장하지만 다른 언어로 보실 분들도 
                                    환영합니다!
                    </IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기술스택</IntroTitle>
                    <IntroContent> 
                        - C 언어
                    </IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행요일</IntroTitle>
                    <IntroContent> 
                        - 화 / 목요일
                    </IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>진행장소</IntroTitle>
                    <IntroContent> 
                        - 도서관
                    </IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>최대인원</IntroTitle>
                    <IntroContent> 
                        - 6명
                    </IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>세션장</IntroTitle>
                    <IntroContent> 
                        - 박도현
                    </IntroContent>
                </IntroWrapper>
                <IntroWrapper>
                    <IntroTitle>기타</IntroTitle>
                    <IntroContent> 
                        - 뿡빵뿡빵
                    </IntroContent>
                </IntroWrapper>
                <ButtonContainer>
                    <ApplicateButton>신청하기</ApplicateButton>
                </ButtonContainer> 
            </Container>
            <Footer/>
        </>        
    );
};

export default Project;