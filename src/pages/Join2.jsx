import React,{useState,useRef,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Complete_Btn from "../components/Complete_Btn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.main`
    margin-top: 100px;
    margin-bottom: 100px;
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
    background: #1B1B25;
    border : none;
    border-radius: 14px;
    margin: 25px;
    margin-top: 0;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
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
    color: #ea0079;
    text-decoration: none;
    font: bold 12px 'arial';
`

const Wrong = styled.p`
    font: bold 10px 'arial';
    color: red;
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


const Join2 = () => {
    const [nickName,setnickName] = useState("");
    const [username, setusername] =useState("");
    const [password,setpassword] = useState("");
    const [personName,setpersonName] = useState("");
    const [repassword, setrepassword] = useState("");
    const [email, setemail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const CompleteNavigate= useNavigate();
    const firstInputRef = useRef(null);

    useEffect(() => {
        if(firstInputRef.current){
            firstInputRef.current.focus();
        }
    },[]);

    const onClick = async() => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('nickName', nickName);
            formData.append('personName', personName);
            formData.append('email', email);
        
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
                        <Quest>이미 계정이 있으신가요?</Quest><StyledLink to = '/login'>로그인</StyledLink>
                    </QuestWrapper>
                </Container>
            </Wrapper>
            {isLoading && (
                <Overlay>
                    <Spinner />
                    <LoadingText>회원가입 중..</LoadingText>
                </Overlay>
            )}
            <Footer/>
        </>
    );
};

export default Join2;