import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    width: 80%;
    margin: 100px auto;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: white;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
`;

const Th = styled.th`
    background: #ab1a65;
    color: white;
    padding: 5px;
    font: bold 14px 'arial';
`;

const Td = styled.td`
    padding: 5px;
    color: white;
    font: bold 14px 'arial';

`;

const Button = styled.button`
    background: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
    color: white;
    border: none;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font: bold 14px 'arial';

    &:hover {
        opacity: 0.8;
    }
`;

// 페이지네이션 스타일
const PaginationWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    
`;

const PageButton = styled.button`
    background: ${(props) => (props.active ? "#ab1a65" : "#ddd")};
    color: ${(props) => (props.active ? "white" : "black")};
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font: bold 14px 'arial';

    &:hover {
        background: #ab1a65;
        color: white;
    }
`;

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 API 요청하여 사용자 데이터 가져오기
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/study/session`, {
                    withCredentials: true, // 인증 정보 포함
                });

                console.log("서버 응답 데이터:", response.data);
                const filteredData = (response.data.content || []).filter(item => item.isAccepted === false);

                setUsers(filteredData); // 필터링된 데이터만 상태로 설정
            } catch (err) {
                console.error("유저 데이터 불러오기 오류:", err);
                setError("유저 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // 🔹 승인 처리 (PUT 요청)
    const handleApprove = async (id) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/study/${id}`,
                {},
                { withCredentials: true, }
            );
            console.log(response);
            console.log(`유저 ${id} 승인 완료`, response.data);
            setUsers(users.filter(user => user.id !== id));

        } catch (err) {
            console.error(`유저 ${id} 승인 중 오류 발생:`, err);
            alert("승인 요청 중 오류가 발생했습니다.");
        }
    };

    // 🔹 삭제 처리 (DELETE 요청)
    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/admin/study/cancel/${id}`,{},
                {
                withCredentials: true,
            });

            console.log(`유저 ${id} 삭제 완료`);

            // UI 업데이트: 삭제된 유저 제거
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error(`유저 ${id} 삭제 중 오류 발생:`, err);
            alert("삭제 요청 중 오류가 발생했습니다.");
        }
    };

    // 🔹 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // 🔹 로딩 또는 에러 표시
    if (loading) return <p style={{ textAlign: "center" }}>데이터 로딩 중...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <Container>
            <Title>유저 관리</Title>
            <Table>
                <thead>
                    <tr>
                        <Th>이름</Th>
                        <Th>스터디명</Th>
                        <Th>관리</Th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user) => (
                        <tr key={user.id}>
                            <Td>{user.leaderName || "이름 없음"}</Td>
                            <Td>{user.studyName || "스터디명 없음"}</Td>
                            <Td>
                                <>
                                    <Button onClick={() => handleApprove(user.id)}>승인</Button>
                                    <Button danger onClick={() => handleDelete(user.id)}>삭제</Button>
                                </>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* 페이지네이션 버튼 */}
            <PaginationWrapper>
                {Array.from({ length: totalPages }, (_, index) => (
                    <PageButton 
                        key={index + 1} 
                        onClick={() => setCurrentPage(index + 1)}
                        active={currentPage === index + 1}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </PaginationWrapper>
        </Container>
    );
};

export default UserManage;