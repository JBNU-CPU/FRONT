import React,{useState, useRef, useEffect, useContext} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import axios from "axios";
import AdminContext from "../AdminContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: 100vw;
    margin-block: 50px;
`;

const Container = styled.div`
    padding: 0;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(121, 120, 120, 0.1);
    border-radius: 20px;
`

const TitleWrapper = styled.div`
    margin: 0%;
    padding: 0;
    padding: 50px 0;
    background: transparent;

`

const Title = styled.p`
    color: white;
    background: transparent;
    font: bold 25px 'arial';
`

const SubtitleWrapper = styled.div`
    background: transparent;
    width: 320px;
`
const Subtitle = styled.p`
    color: white;
    font: bold 18px "arial";
    padding: 0;
    background: transparent;
    margin: 0;
`

const MenuWrapper = styled.ul`
    margin: 10px 15px;
    padding: 10px;
    width: 320px;
    height : 130px;
    border: 1px solid gray;
    border-left: none;
    background: transparent;
    border-right : none;
`
const InfoMenu = styled.li`
    color: #878C9E;
    list-style: none;
    width: 42px;
    height: 18px;
    padding-right: 20px;
    padding-bottom: 10px;
    background: transparent;
    font: 400 15px "arial";
`
const Info = styled.p`
    color: #878C9E;
    padding: 0;
    margin: 0;
    background: transparent;
    font: 400 15px "arial";
`
const InfoWrapper = styled.div`
    display: flex;
    background: transparent;
    flex-direction: row;
`

const StyledLinkWrapper = styled.div`
    width: 320px;
    height: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
    background: transparent;
    padding-top: 20px;
`

const StyledLink = styled(Link)`
    font: 400 15px 'arial';
    text-decoration: none;
    background: transparent;
    color: #ab1a65;
    &:hover {
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`;

const RightIcon = styled(FaChevronRight)`
    color: #ab1a65;
    position: relative;
    background: transparent;
    top: 2.5px;
`


const Leave = styled.p`
    margin: 0 0 20px 0;
    pad: 0;
    padding-top: 50px;
    font: bold 12px 'arial';
    background: transparent;
    color: #ab1a65;
    &:hover {
        cursor: pointer;
        text-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* 글자 주변 희미한 빛 */
    }
`;

const Mypage = () => {
    const [personName, setPersonName] = useState("");
    const [nickName, setnickName] = useState("");
    const [email, setEmail] = useState("");
    const {setIsAdmin} = useContext(AdminContext);

    useEffect(() => {
        // 데이터 가져오기
        const fetchData = async () => {
            try {
                // Axios 요청에 쿠키 인증 정보를 포함하도록 설정
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
                    withCredentials: true, // 쿠키를 포함하기 위해 설정
                });
            
                const { username, personName, nickName, email, role } = response.data;
            
                setPersonName(personName || ""); // 이름 설정
                setnickName(nickName || ""); // 닉네임 설정
                setEmail(email || ""); // 이메일 설정
                
                if (username) {
                    localStorage.setItem("username", username);
                }
                if (role === "ROLE_ADMIN"){
                    setIsAdmin(true);
                    console.log("admin");
                }else{
                    setIsAdmin(false);
                    console.log("guest");
                }
            } catch (error) {
                console.error("마이페이지 데이터 로드 오류:", error);
                alert("마이페이지 정보를 불러오는 데 실패했습니다.");
            }
            
        };

        fetchData();
    }, [setIsAdmin]);

    const handleWithdraw = async () => {
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/mypage/withdraw`, {
                    withCredentials: true, // 쿠키를 포함하여 인증
                });
                console.log("회원탈퇴 성공:", response.data);
                alert("회원탈퇴가 성공적으로 처리되었습니다.");
                // 탈퇴 후 초기 화면 또는 로그인 화면으로 이동
                window.location.href = "/";
            } catch (error) {
                console.error("회원탈퇴 실패:", error);
                alert("회원탈퇴 처리 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <>
            <Header />
            <Wrapper>
                <Container>
                    <TitleWrapper>
                        <Title>마이페이지</Title>
                    </TitleWrapper>
                    <SubtitleWrapper>
                        <Subtitle>회원정보</Subtitle>
                    </SubtitleWrapper>
                    <MenuWrapper>
                        <InfoWrapper>
                            <InfoMenu>이름</InfoMenu>
                            <Info>{personName}</Info>
                        </InfoWrapper>
                        <InfoWrapper>
                            <InfoMenu>닉네임</InfoMenu>
                            <Info>{nickName}</Info>
                        </InfoWrapper>
                        <InfoWrapper>
                            <InfoMenu>이메일</InfoMenu>
                            <Info>{email}</Info>
                        </InfoWrapper>
                        <StyledLinkWrapper>
                            <StyledLink to="/revisememberinfo2">
                                회원정보 수정
                                <RightIcon />
                            </StyledLink>
                        </StyledLinkWrapper>
                    </MenuWrapper>
                    <Leave onClick={handleWithdraw}>회원탈퇴</Leave>
                </Container>
            </Wrapper>
            
        </>
    );
};

export default Mypage;