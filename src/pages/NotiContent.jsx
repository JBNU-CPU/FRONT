import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from '../components/Spinner'; // 스피너 컴포넌트 임포트

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 765px) {
        width: calc(80%);
    }
`;

const Label = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 5px;
    background: transparent;
    text-align: left;
    width: 100%;
`;

const Content = styled.textarea`
    width: 100%;
    font-size: 16px;
    color: #ddd;
    line-height: 1.6;
    margin-bottom: 5px;
    white-space: pre-wrap;
    background: transparent;
    border: ${(props) => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
    border-radius: 5px;
    resize: none;
    padding: 10px;
`;

const Input = styled.input`
    width: 100%;
    font-size: 16px;
    color: #ddd;
    margin-bottom: 5px;
    background: transparent;
    border: ${(props) => (props.editable ? "1px solid #ab1a65" : "1px solid transparent")};
    border-radius: 5px;
    padding: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    background: transparent;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font: bold 14px 'arial';
    cursor: pointer;
    color: white;
    background: ${(props) => (props.danger ? "#ab1a65" : "#4CAF50")};
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: ${(props) => (props.danger ? "#e0004d" : "#45a049")};
    }

    &:active {
        background: ${(props) => (props.danger ? "#8b0037" : "#3d8b40")};
    }
`;

const NotiContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const localUserId = localStorage.getItem("userId");
    const [userid, setUserid] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

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
                setContent(response.data);
                setUserid(response.data.memberId);
                setEditedTitle(response.data.title);
                setEditedContent(response.data.content);
            } catch (err) {
                console.error("데이터 로드 오류:", err);
                setError("데이터를 가져오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setIsLoading(true); // 삭제 작업 중 로딩 표시
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                    withCredentials: true,
                });
                console.log("삭제 성공:", response);
                alert("게시글이 삭제되었습니다.");
                navigate("/notification");
            } catch (err) {
                console.error("삭제 요청 오류:", err);
                alert("게시글 삭제에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleEdit = async () => {
        if (window.confirm("수정 내용을 저장하시겠습니까?")) {
            setIsLoading(true); // 수정 작업 중 로딩 표시
            try {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                    title: editedTitle,
                    content: editedContent,
                }, {
                    withCredentials: true,
                });
                console.log("수정 성공:", response);
                alert("게시글이 수정되었습니다.");
                setIsEditing(false);
                setContent((prev) => ({
                    ...prev,
                    title: editedTitle,
                    content: editedContent,
                }));
            } catch (err) {
                console.error("수정 요청 오류:", err);
                alert("게시글 수정에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isLoading) return <Spinner text="로딩 중..." />; // 스피너 표시

    if (error) return <Wrapper><Container><p>{error}</p></Container></Wrapper>;

    return (
        <Wrapper>
            <Container>
                {content ? (
                    <>
                        <Label>제목</Label>
                        <Input
                            editable={isEditing}
                            readOnly={!isEditing}
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <Label>작성자</Label>
                        <Input
                            readOnly
                            value={content.nickName}
                        />
                        <Label>작성일</Label>
                        <Input
                            readOnly
                            value={content.createDate.slice(0, 10)}
                        />
                        <Label>내용</Label>
                        <Content
                            editable={isEditing}
                            readOnly={!isEditing}
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        {userid === Number(localUserId) && (
                            <ButtonWrapper>
                                {isEditing ? (
                                    <Button onClick={handleEdit}>저장</Button>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)}>수정</Button>
                                )}
                                <Button danger onClick={handleDelete}>삭제</Button>
                            </ButtonWrapper>
                        )}
                    </>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </Container>
        </Wrapper>
    );
};

export default NotiContent;
