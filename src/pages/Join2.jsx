import React,{useState,useRef,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import Header from "../components/Header";
import Complete_Btn from "../components/Complete_Btn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    margin-block: 100px;
`

const Container = styled.main`
    height: auto;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: rgba(255, 255, 255, 0.1); /* 반투명한 배경 */
    backdrop-filter: blur(10px); /* 블러 효과 */
    border-radius: 5px;
    width: 500px;
`

const MainName = styled.p`
    font: bold 30px 'arial';
    color: white;
    background: none;
    padding-top: 10px;
`
const NickText = styled.p`
    padding: 0px;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 260px;
`
const IDText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 230px;
`

const PasswordText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 250px;
`

const RePasswordText = styled.p`
    padding: 0;
    margin: 0;
    background: none;
    color: white;
    padding-bottom: 10px;
    font: bold 14px 'arial';
    position: relative;
    padding-right: 220px;
`


const StyledInput = styled.input`
    width: 300px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border : 2px solid transparent;
    border-radius: 14px;
    margin: 25px;
    margin-top: 0;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
    outline: none; /* 기본 브라우저 outline 제거 */

    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`

const CompleteWrapper = styled.div`
    margin: 0;
    padding: 0;
    padding-top: 15px;
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
    padding : 20px 20px;
`

const StyledLink = styled(Link)`
    background: none;
    color: #ab1a65;
    text-decoration: none;
    font: bold 12px 'arial';
    &.login:hover{
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`

const Wrong = styled.p`
    font: bold 10px 'arial';
    color: #ab1a65;
    background: transparent;
    padding-bottom: 15px;
`
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

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalBox = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const ModalText = styled.p`
    background: transparent;
    font: bold 14px 'arial';
    color: black;
    margin-bottom: 20px; 
`;

const CloseButton = styled.button`
    background: #ab1a65;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font: bold 12px 'arial';
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #d12b7f;
    }
`;


const Join2 = () => {
    const [nickName,setnickName] = useState("");
    const [username, setusername] =useState("");
    const [password,setpassword] = useState("");
    const [personName,setpersonName] = useState("");
    const [repassword, setrepassword] = useState("");
    const [email, setemail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const CompleteNavigate= useNavigate();
    const firstInputRef = useRef(null);

    useEffect(() => {
        if(firstInputRef.current){
            firstInputRef.current.focus();
        }
    },[]);

    const closeModal = () =>{
        setIsModalOpen(false);
    };

    const onClick = async() => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('nickName', nickName);
            formData.append('personName', personName);
            formData.append('email', email);
            console.log(`${process.env.REACT_APP_API_URL}/signup`)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        
            if (response.status === 200 || response.status === 201) {
                alert('회원가입이 완료되었습니다.');
                CompleteNavigate('/login');
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }        
    }

    const passwordRight = password && repassword && (password === repassword);
    const shouldShowPasswordError = password && repassword && password !== repassword;    
    const isButtonActive = nickName && username && passwordRight && personName && email;
    return(
        <>
            <Header/>
            {isModalOpen && (
                <ModalBackground>
                    <ModalBox>
                        <ModalText>CPU 부원이신 분들만 회원가입이 가능합니다! <br/> <br/>
                        혹시 CPU 부원이지만 회원가입이 되지 않으시는 분들은 회장에게 연락해 주세요!</ModalText>
                        <CloseButton onClick = {closeModal}>닫기</CloseButton>
                    </ModalBox>
                </ModalBackground>
            )}
            <Wrapper>
                <Container>
                    <MainName>Join</MainName>
                    <IDText>아이디(학번)</IDText>
                    <StyledInput type='id' placeholder="학번을 입력해주세요"  ref={firstInputRef} value={username} onChange={(e)=>{setusername(e.target.value)}}/>
                    <PasswordText>비밀번호</PasswordText>
                    <StyledInput type='password' placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setpassword(e.target.value)}/>
                    <RePasswordText>비밀번호 확인</RePasswordText>
                    <StyledInput type='password' placeholder="비밀번호를 다시 입력해주세요" value={repassword} onChange={(e) => setrepassword(e.target.value)}/>
                    {shouldShowPasswordError && <Wrong>비밀번호가 틀립니다</Wrong>}
                    <NickText>닉네임</NickText>
                    <StyledInput type='text' placeholder="닉네임을 입력해주세요"value={nickName} onChange={(e) => {setnickName(e.target.value)}}/>
                    <NickText>이름</NickText>
                    <StyledInput type='text' placeholder="이름을 입력해주세요" value={personName} onChange={(e) => {setpersonName(e.target.value)}}/>
                    <NickText>이메일</NickText>
                    <StyledInput type='email' placeholder="이메일을 입력해주세요" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                    <CompleteWrapper>
                        <Complete_Btn onClick = {onClick} isActive={isButtonActive}/>
                    </CompleteWrapper>
                    <QuestWrapper>
                        <Quest>이미 계정이 있으신가요?</Quest><StyledLink className="login" to = '/login'>로그인</StyledLink>
                    </QuestWrapper>
                </Container>
            </Wrapper>
            {isLoading && (
                <Overlay>
                    <Spinner />
                    <LoadingText>회원가입 중..</LoadingText>
                </Overlay>
            )}
        </>
    );
};

export default Join2;