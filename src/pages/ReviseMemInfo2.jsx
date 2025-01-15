import React,{useState,useRef,useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Next_Btn from "../components/Next_Btn";
import Certification from "../components/Certification";
import Save from "../components/Save";
import Resend_Btn from "../components/Resend_Btn";

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
    padding-top: 63px;
    padding-bottom: 30px;
`

const Title = styled.p`
    color: white;
    font: bold 30px 'arial';
`
const IDWrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 300px;
    height : 18px;
    display: flex;
    flex-direction: row;
`

const Line = styled.div`
    padding: 0;
    margin: 0;
    width: 340px;
    border-top: 1px solid gray;
    margin-top: 15px;
`

const ID = styled.p`
    padding: 0;
    margin: 0;
    font: 400 14px 'arial';
    color: white;
    padding-right: 20px;
`
const ApiId = styled.p`
    font: 400 14px 'arial';
    color : #878C9E;
    margin: 0;
    padding:0;
`
const Wrapper = styled.div`
    margin: 10px 0;
    padding: 0;
    width: 320px;
    height : auto;
`

const StyledInput = styled.input`
    width: 300px;
    height: 45px;
    background: #1B1B25;
    border : none;
    border-radius: 14px;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
`

const Text = styled.p`
    padding: 10px;
    padding-left: 15px;
    margin: 0;
    color: white;
    font: bold 14px 'arial';
`
const CertiWrapper = styled.div`
    margin: 0;
    padding: 20px 0;
    width: 320px;
    height : auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`
const SaveWrapper = styled.div`
    padding: 0;
    margin: 0;
    padding-top: 40px;
    padding-bottom: 100px;
`

const CertiInput = styled.input`
    width: 236px;
    height: 45px;
    background: #1B1B25;
    border : none;
    border-radius: 14px;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
`

const Certibutton = styled.button`
    width: 50px;
    height: 45px;
    margin: 0;
    margin-left: 10px;
    padding: 0;
    background: ${({isActive}) => (isActive ? '#3987EC' : '#6F7486')};
    color: white;
    border-radius: 14px;
    border: none;
    &:hover{
        cursor : ${({isActive}) => (isActive ? 'pointer' : 'default')};
    }
`

// ID자리에 api에서 가져온 id를 넣기 {id}
const ReviseMemInfo2 = () => {
    const firsInputRef = useRef(null);
    const [name,setname] = useState("");
    const [nickName, setnickName] =useState("");
    const [email,setemail] = useState("");
    const [password, setpassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [certinum, setcertinum] = useState("");
    const [IsCerti, setIsCerti] = useState(false);
    const [showResend, setShowResend] = useState(false);

    const handleClick = () => {
        if(isCertiButton){
            setIsCerti(true);
            setShowResend(true);
        }
    };

    const handleResend = () => {
        alert('인증번호가 재발송되었습니다.');
    };

    useEffect(() => {
        if(firsInputRef.current){
            firsInputRef.current.focus();
        }
    },[]);

    const isCertiButton = name && nickName && email;
    const isCertinum = isCertiButton && certinum;
    const isSave = isCertiButton && password && repassword && (password === repassword);

    return(
        <>
            <Header/>
            <Container>
                <TitleWrapper><Title>회원정보 수정</Title></TitleWrapper>
                <IDWrapper><ID>아이디(학번)</ID><ApiId>200000000</ApiId></IDWrapper> 
                <Line></Line>
                <Wrapper>
                    <Text>이름</Text>
                    <StyledInput type='name' placeholder="이름을 입력해주세요" ref={firsInputRef} value={name} onChange ={(e) => {setname(e.target.value)}}/>
                </Wrapper>
                <Wrapper>
                    <Text>닉네임</Text>
                    <StyledInput type='nickName' placeholder="닉네임을 입력해주세요" value={nickName} onChange ={(e) => {setnickName(e.target.value)}}/>
                </Wrapper>
                <Wrapper>
                    <Text>이메일</Text>
                    <StyledInput type='email' placeholder="이메일을 입력해주세요" value={email} onChange ={(e) => {setemail(e.target.value)}}/>
                </Wrapper>
                <CertiWrapper>
                    {showResend ? (<Resend_Btn onClick={handleResend}/>) : (<Certification isActive={isCertiButton} onClick = {handleClick}/>)}
                </CertiWrapper>
                {IsCerti ? <><Wrapper><CertiInput placeholder="인증번호를 입력하세요" value={certinum} onChange={(e) => {setcertinum(e.target.value)}}></CertiInput><Certibutton  isActive={isCertinum}>인증</Certibutton></Wrapper></> : null}
                <Wrapper>
                    <Text>비밀번호</Text>
                    <StyledInput type='password' placeholder="비밀번호를 입력해주세요" value={password} onChange ={(e) => {setpassword(e.target.value)}}/>
                </Wrapper>
                <Wrapper>
                    <Text>비밀번호 확인</Text>
                    <StyledInput type='password' placeholder="비밀번호를 입력해주세요" value={repassword} onChange ={(e) => {setrepassword(e.target.value)}}/>
                </Wrapper>
                <SaveWrapper>
                    <Save isActive={isSave}/>
                </SaveWrapper>
            </Container>
        </>
    );
};

export default ReviseMemInfo2;