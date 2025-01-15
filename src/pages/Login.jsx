import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import axios from "axios";
import Login_Btn from "../components/Login_Btn";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
`;

const Container = styled.form`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 5px;
    padding: 40px 20px;
    width: 350px;
`;

const MainName = styled.p`
    font: bold 30px "arial";
    color: white;
    margin-bottom: 50px;
    background: transparent;
`;

const StyledInput = styled.input`
    width: 280px;
    height: 45px;
    border: none;
    border-radius: 14px;
    margin-bottom: 20px;
    color: white;
    background: #1e1e1e;
    padding-left: 15px;
    font: bold 14px "arial";
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
    color: #ea0079;
    text-decoration: none;
    font: bold 12px "arial";
    background: transparent;
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
    border-top: 5px solid #ea0079;
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
        console.log(`${process.env.REACT_APP_API_URL}/loginProc`)
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/loginProc`,
                { username, password }
            );
            if (response.status === 200) {
                alert("로그인 되었습니다.");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                alert("아이디, 비밀번호를 다시 확인해보세요.");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
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
                    <MainName>Log in</MainName>
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
                        <StyledLink to="/join2">회원가입</StyledLink>
                    </JoinWrapper>
                </Container>
            </Wrapper>
            {isLoading && (
                <Overlay>
                    <Spinner />
                    <LoadingText>로그인 중...</LoadingText>
                </Overlay>
            )}
            <Footer />
        </>
    );
};

export default Join;
