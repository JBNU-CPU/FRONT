import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: transparent;
`;

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    padding: 20px 30px;
    margin: 20px auto;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
    background: transparent;
`;

const Label = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    background: transparent;
`;

const Content = styled.div`
    font-size: 16px;
    color: #ddd;
    line-height: 1.6;
    margin-bottom: 20px;
    white-space: pre-wrap; /* 줄바꿈 및 공백 유지 */
    background: transparent;
`;


const CommunityContent = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("ID가 없습니다.");
            return;
        }

        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                    withCredentials: true,
                });
                console.log("게시글 데이터:", response.data);
                setContent(response.data);
            } catch (err) {
                console.error("데이터 로드 오류:", err);
                setError("데이터를 가져오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [id]);

    if (isLoading) return <Wrapper><Container><p>로딩 중...</p></Container></Wrapper>;
    if (error) return <Wrapper><Container><p>{error}</p></Container></Wrapper>;

    return (
        <>
            <Wrapper>
                <Container>
                    <Title>Notification Content</Title>
                    {content ? (
                        <>
                            <Label>제목</Label>
                            <Content>{content.title}</Content>
                            <Label>작성자</Label>
                            <Content>{content.nickName}</Content>
                            <Label>작성일</Label>
                            <Content>{content.createDate.slice(0, 10)}</Content>
                            <Label>내용</Label>
                            <Content>{content.content}</Content>
                        </>
                    ) : (
                        <p>데이터가 없습니다.</p>
                    )}
                </Container>
            </Wrapper>
        </>
    );
};

export default CommunityContent;
