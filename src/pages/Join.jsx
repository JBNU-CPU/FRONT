import React,{useState, useRef, useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Certification from "../components/Certification";
import Next_Btn from "../components/Next_Btn";
import Resend_Btn from "../components/Resend_Btn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.main`
    margin-top: 100px;
    height: auto;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-x: hidden;
    background: rgba(255, 255, 255, 0.1); /* 반투명한 배경 */
    backdrop-filter: blur(10px); /* 블러 효과 */
    border-radius: 5px;
`

const MainName = styled.p`
    font: bold 30px 'arial';
    color: white;
    background: none;
    padding-top: 63px;
`
const NameText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 260px;
`

const EmailText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 250px;
`

const StyledInput = styled.input`
    width: 300px;
    height: 45px;
    background: #1B1B25;
    border : none;
    border-radius: 14px;
    margin: 25px;
    margin-top: 0;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
`

const CertificationWrapper = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
    padding-left: 230px;
    padding-bottom: 25px;
    background: none;
`

const NextWrapper = styled.div`
    margin: 0;
    padding: 0;
    background: none;
`

const QuestWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
`

const Quest = styled.p`
    font: bold 12px 'arial';
    background: none;
    color: white;
    padding : 50px 20px;
`

const StyledLink = styled(Link)`
    background: none;
    color: #3987EC;
    text-decoration: none;
    font: bold 12px 'arial';
`

// 인증 부분에서 certi값에 따라 컴포넌트 변화하도록 코드 수정하기
// join에서 다음 버튼 누르면 join2로 이동하도록 해야함
// useNavigate로 바꿔야함 -> 비동기에서는 useNavigate가 맞는 표현
const Join = () => {
    const [personName, setpersonName] = useState("");
    const [email,setemail] = useState("");
    const [certi,setCerti] = useState(false);
    const [certinum, setcertinum] = useState("");
    const navigate = useNavigate();
    const firstInputRef = useRef(null);
    const secondInputRef= useRef(null);

    useEffect(() => {
        if(firstInputRef.current){
            firstInputRef.current.focus();
        }
    },[]);

    useEffect(() => {
        if(certi && secondInputRef.current){
            secondInputRef.current.focus();
        }
    },[certi]);

    const CertiClick = () => {
        if(personName && email){
            setCerti(true)
        }
    };

    const Joinnavigate = () => {
        navigate('/join2')
    }

    const isButtonActive = personName && email;
    const isNextButtonActive = certinum;

    return(
        <>
            <Header/>
            <Wrapper>
                <Container>
                    <MainName>Join</MainName>
                    <NameText>이름</NameText>
                    <StyledInput type='text' placeholder="이름을 입력해주세요" ref= {firstInputRef} value={personName} onChange={(e) => {setpersonName(e.target.value)}}/>
                    <EmailText>이메일</EmailText>
                    <StyledInput type = 'email' placeholder="이메일 주소를 입력해주세요" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                    <CertificationWrapper onClick={CertiClick}>
                        {certi ? <Resend_Btn/> : <Certification isActive={isButtonActive}/>}
                    </CertificationWrapper>
                    {certi ? <StyledInput type="text" placeholder="인증번호" ref={secondInputRef} value={certinum} onChange={(e) => setcertinum(e.target.value)}/> : null}
                    <NextWrapper>
                        <Next_Btn onClick={Joinnavigate} isActive={isNextButtonActive}/>
                    </NextWrapper>
                    <QuestWrapper>
                        <Quest>이미 계정이 있으신가요?</Quest><StyledLink to = '/login'>로그인</StyledLink>
                    </QuestWrapper>
                </Container>
            </Wrapper>
        
        </>
    );
};

export default Join;