import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import axios from "axios";
import Login_Btn from "../components/Login_Btn";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import logo from '../Picture/CPU_logo_full.jpeg'


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

const Container = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(121, 120, 120, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px 20px;
    width: 350px;
`;

const MainName = styled.p`
    font: bold 20px "arial";
    color: white;
    background: transparent;
    margin: 5px 0 20px 0;
    &.year{
        margin: 0;
        font: bold 8px 'arial';
    }
`;

const StyledInput = styled.input`
    width: 280px;
    height: 45px;
    border: 2px solid transparent;
    border-radius: 14px;
    margin-bottom: 20px;
    color: white;
    background: rgba(255, 255, 255, 0.1); /* 투명 배경 */
    padding-left: 15px;
    font: bold 14px "arial";
    outline: none; /* 기본 브라우저 outline 제거 */

    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`;


const LoginWrapper = styled.div`
    margin-top: 20px;
`;

const FindPassWrapper = styled.div`
    text-align: right;
    width: 280px;
    margin-top: -10px;
    margin-bottom: 20px;
    background: transparent;
`;

const FindPass = styled.p`
    color: white;
    cursor: pointer;
    background: transparent;
    &:hover {
        color: gray;
    }
`;

const JoinWrapper = styled.div`
    margin-top: 20px;
    text-align: center;
    background: transparent;
`;

const StyledLink = styled(Link)`
    color: #ab1a65;
    text-decoration: none;
    font: bold 12px "arial";
    background: transparent;
    &.signup:hover {
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`;


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* 상위 레이어에 표시 */
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top: 5px solid #ab1a65;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 20px; /* 아래 텍스트와 간격 */
`;

const LoadingText = styled.p`
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
`;

const Logo = styled.img`
    height: 70px;
    width: 70px;
    margin: 0;
`;

const Join = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const firstInputRef = useRef(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // 로딩 시작
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/loginProc`,
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // 쿠키 포함
                }
            );
        
            if (response.status === 200) {
                alert("로그인 되었습니다.");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                alert("아이디, 비밀번호를 다시 확인해보세요.");
            }
        } catch (error) {
            // 디버깅용 로그 추가
            if (error.response) {
                console.error("응답 오류:", error.response.data);
                console.error("응답 상태 코드:", error.response.status);
                console.error("응답 헤더:", error.response.headers);
            } else if (error.request) {
                console.error("요청이 만들어졌으나 응답을 받지 못함:", error.request);
            } else {
                console.error("요청 설정 중 오류 발생:", error.message);
            }
            alert("로그인 중 문제가 발생했습니다.");
        } finally {
            setIsLoading(false); // 로딩 종료
        }
            
    };
    
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const isButtonActive = username.trim() && password.trim();

    return (
        <>
            <Header/>
            <Wrapper>
                <Container onSubmit={handleLogin}>
                    <Logo src={logo}/>
                    <MainName>CPU</MainName>
                    <StyledInput
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        ref={firstInputRef}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <StyledInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FindPassWrapper>
                        <StyledLink to="/findpassword">
                            <FindPass>비밀번호 찾기</FindPass>
                        </StyledLink>
                    </FindPassWrapper>
                    <LoginWrapper>
                        <Login_Btn
                            type="submit"
                            isActive={isButtonActive && !isLoading}
                            disabled={!isButtonActive || isLoading}
                        >
                            {isLoading ? "로그인 중..." : "로그인"}
                        </Login_Btn>
                    </LoginWrapper>
                    <JoinWrapper>
                        <StyledLink className='signup' to="/join2">회원가입</StyledLink>
                    </JoinWrapper>
                </Container>
            </Wrapper>
            {isLoading && (
                <Overlay>
                    <Spinner />
                    <LoadingText>로그인 중...</LoadingText>
                </Overlay>
            )}
        </>
    );
};

export default Join;
