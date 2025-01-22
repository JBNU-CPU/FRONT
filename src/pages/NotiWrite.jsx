import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    height: 70vh;
    width: 500px;
    margin-top: 100px;
    background: rgba(121, 120, 120, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
`

const SubWrapper = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 30px auto;
    width: calc(100%);
`

const Label = styled.label`
    background: transparent;
    color: white;
    font: bold 20px 'arial';
    margin-bottom: 10px;
    &.text{
        margin-top: 30px;
    }
`

const Input = styled.input`
    background: rgba(255, 255, 255, 0.1); /* 투명 배경 */
    border-radius: 5px;
    border: 2px solid transparent;
    height: 15px;
    width: calc(80%);
    height: 30px;
    outline: none; /* 기본 브라우저 outline 제거 */
    padding-left: 10px;
    color: white;
    font: bold 15px 'arial';
    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`

const Text = styled.textarea`
    background: rgba(255, 255, 255, 0.1); /* 투명 배경 */
    border-radius: 10px;
    width: calc(80%);
    height: 300px;
    outline: none; /* 기본 브라우저 outline 제거 */
    border: 2px solid transparent;
    padding-left: 10px;
    color: white;
    font: bold 15px 'arial';
    &:focus {
        border: 2px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
    }
`

const Button = styled.button`
    padding: 5px 10px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font: bold 15px 'arial';
    background: #ab1a65;
    margin:20px 10px;
    margin-bottom: 40px;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
    &:hover:not(:disabled) {
        box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
        transform: scale(1); /* 살짝 확대 */
    }
`

const NotiWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
        setIsSubmitting(true); // 전송 상태 활성화

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/post`, // API 경로
                {
                    isNotice: true,
                    title: title, // 입력된 제목
                    content: content, // 입력된 내용
                },
                {
                    headers: {
                        "Content-Type": "application/json", // JSON 형식 명시
                    },
                    withCredentials: true, // 쿠키 포함
                }
            );

            alert("공지사항이 성공적으로 등록되었습니다!");
            console.log("서버 응답:", response.data);

            // 성공 시 /notification 경로로 이동
            navigate("/notification");
        } catch (error) {
            console.error("공지사항 등록 중 오류 발생:", error);
            alert("공지사항 등록에 실패했습니다.");
        } finally {
            setIsSubmitting(false); // 전송 상태 비활성화
        }
    };

    return (
        <>
            <Wrapper>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <SubWrapper>
                            <Label htmlFor="title">제목</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Label htmlFor="content" className="text">내용</Label>
                            <Text
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></Text>
                        </SubWrapper>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "등록 중..." : "등록"}
                        </Button>
                    </Form>
                </Container>
            </Wrapper>
        </>
    );
};

export default NotiWrite;
