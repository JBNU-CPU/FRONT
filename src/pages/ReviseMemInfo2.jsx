import React,{useState,useRef,useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Save from "../components/Save";
import axios from "axios";
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
    background: rgba(255, 255, 255, 0.1);
    border : 2px solid transparent;
    border-radius: 14px;
    color: white;
    padding-left: 20px;
    font: bold 14px 'arial';
    outline: none; /* 기본 브라우저 outline 제거 */
    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`

const Text = styled.p`
    padding: 10px;
    padding-left: 15px;
    margin: 0;
    color: white;
    font: bold 14px 'arial';
`

const SaveWrapper = styled.div`
    padding: 0;
    margin: 0;
    padding-top: 40px;
    padding-bottom: 100px;
`

const Wrong = styled.p`
    font: bold 10px 'arial';
    color: #ab1a65;
    background: transparent;
    padding-bottom: 15px;
`

// ID자리에 api에서 가져온 id를 넣기 {id}
const ReviseMemInfo2 = () => {
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const [currentName, setCurrentName] = useState("");
    const [currentNickName, setCurrentNickName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // 기존 정보 가져오기
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mypage`, {
                    withCredentials: true,
                });
                const { personName, nickName, email } = response.data;

                // 기존 정보 상태에 저장
                setCurrentName(personName || "");
                setCurrentNickName(nickName || "");
                setCurrentEmail(email || "");
            } catch (error) {
                console.error("기존 정보 로드 실패:", error);
                alert("회원 정보를 불러오는 데 실패했습니다.");
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        // 비밀번호 확인
        if (password && password !== repassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 수정할 데이터 생성
        const payload = {
            nickName: nickName || currentNickName, // 입력값 없으면 기존 값 사용
            personName: name || currentName,
            email: email || currentEmail,
            password: password || undefined, // 비밀번호는 선택적 필드
        };

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/mypage`,
                payload,
                {
                    withCredentials: true, // 인증 정보 포함
                }
            );
            console.log("회원정보 수정 성공:", response.data);
            alert("회원정보가 성공적으로 수정되었습니다.");
            navigate("/mypage"); // 마이페이지로 이동
        } catch (error) {
            console.error("회원정보 수정 실패:", error);
            alert("회원정보 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <Header />
            <Container>
                <TitleWrapper>
                    <Title>회원정보 수정</Title>
                </TitleWrapper>
                <Wrapper>
                    <Text>이름</Text>
                    <StyledInput
                        type="text"
                        placeholder={currentName || "이름을 입력해주세요"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Wrapper>
                <Wrapper>
                    <Text>닉네임</Text>
                    <StyledInput
                        type="text"
                        placeholder={currentNickName || "닉네임을 입력해주세요"}
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                </Wrapper>
                <Wrapper>
                    <Text>이메일</Text>
                    <StyledInput
                        type="email"
                        placeholder={currentEmail || "이메일을 입력해주세요"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Wrapper>
                <Wrapper>
                    <Text>비밀번호</Text>
                    <StyledInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Wrapper>
                <Wrapper>
                    <Text>비밀번호 확인</Text>
                    <StyledInput
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                    />
                </Wrapper>
                <SaveWrapper>
                    <Save isActive={true} onClick={handleSave} />
                </SaveWrapper>
            </Container>
        </>
    );
};

export default ReviseMemInfo2;
