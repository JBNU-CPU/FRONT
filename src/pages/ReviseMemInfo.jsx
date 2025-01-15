import React,{useState,useRef,useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Next_Btn from "../components/Next_Btn";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleWrapper = styled.div`
    margin: 0%;
    padding: 0;
    padding: 63px 0;
`

const Title = styled.p`
    color: white;
    font: bold 30px 'arial';
`

const SubtitleWrapper = styled.div`
    width: 320px;
`
const Subtitle = styled.p`
    color: white;
    font: bold 18px "arial";
    padding: 0;
    margin: 0;
`

const PasswordWrapper = styled.div`
    margin: 10px 0;
    padding: 10px;
    width: 320px;
    height : 130px;
    border-top: 1px solid gray;
`

const StyledInput = styled.input`
    width: 300px;
    height: 45px;
    background: #1B1B25;
    border : none;
    border-radius: 14px;
    margin-top: 20px;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
`

const ReviseMemInfo = () => {
    const ReviseNaviate = useNavigate();
    const [password, Setpassword] = useState('');
    const firsInputRef = useRef(null);

    useEffect(() => {
        if(firsInputRef.current){
            firsInputRef.current.focus();
        }
    },[]);

    const onClick = () => {
        ReviseNaviate('/revisememberinfo2')
    };

    const isButtonActive = password; // 여기서 가져온 password정보와 같은 경우로 바꿔야함 (password === api.password)

    return(
        <>
            <Header/>
            <Container>
                <TitleWrapper><Title>회원정보 수정</Title></TitleWrapper>
                <SubtitleWrapper><Subtitle>회원정보 확인</Subtitle><p style={{color:'#878C9E', font:'400 12px arial'}}>정보 보호를 위해 비밀번호를 다시 입력해주세요</p></SubtitleWrapper>
                <PasswordWrapper>
                    <StyledInput type='password' placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => Setpassword(e.target.value)}/>
                </PasswordWrapper>
                <Next_Btn isActive={isButtonActive} onClick={onClick}/>
            </Container>
        </>
    );
};

export default ReviseMemInfo;