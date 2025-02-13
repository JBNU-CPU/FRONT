import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 80%;
    margin: 50px auto;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: #333;
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
    background: #4CAF50;
    color: white;
    padding: 15px;
    border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
    padding: 15px;
    border-bottom: 1px solid #ddd;
    color: white;
    font-size: 14px;
`;

const Button = styled.button`
    background: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
    color: white;
    border: none;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
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
    background: ${(props) => (props.active ? "#4CAF50" : "#ddd")};
    color: ${(props) => (props.active ? "white" : "black")};
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #4CAF50;
        color: white;
    }
`;

const StudyManage = () => {
    // 더미 사용자 데이터 (20명 이상 추가)
    const [users, setUsers] = useState([
        { id: 1, studentId: "2021001", name: "김철수", department: "컴퓨터공학과", status: "대기" },
        { id: 2, studentId: "2021002", name: "이영희", department: "전자공학과", status: "대기" },
        { id: 3, studentId: "2021003", name: "박민수", department: "소프트웨어학과", status: "대기" },
        { id: 4, studentId: "2021004", name: "홍길동", department: "기계공학과", status: "대기" },
        { id: 5, studentId: "2021005", name: "정수진", department: "화학공학과", status: "대기" },
        { id: 6, studentId: "2021006", name: "최준영", department: "산업공학과", status: "대기" },
        { id: 7, studentId: "2021007", name: "한지민", department: "건축학과", status: "대기" },
        { id: 8, studentId: "2021008", name: "이도현", department: "수학과", status: "대기" },
        { id: 9, studentId: "2021009", name: "김민지", department: "영어영문학과", status: "대기" },
        { id: 10, studentId: "2021010", name: "송지은", department: "국어국문학과", status: "대기" },
        { id: 11, studentId: "2021011", name: "최민호", department: "경영학과", status: "대기" },
        { id: 12, studentId: "2021012", name: "박서준", department: "경제학과", status: "대기" },
        { id: 13, studentId: "2021013", name: "김지원", department: "법학과", status: "대기" },
        { id: 14, studentId: "2021014", name: "오지훈", department: "사회학과", status: "대기" },
        { id: 15, studentId: "2021015", name: "강유진", department: "심리학과", status: "대기" }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 승인 처리
    const handleApprove = (id) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, status: "승인됨" } : user
        ));
    };

    // 취소 (삭제) 처리
    const handleReject = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <Container>
            <Title>유저 관리</Title>
            <Table>
                <thead>
                    <tr>
                        <Th>학번</Th>
                        <Th>이름</Th>
                        <Th>학과</Th>
                        <Th>상태</Th>
                        <Th>관리</Th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user) => (
                        <tr key={user.id}>
                            <Td>{user.studentId}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.department}</Td>
                            <Td>{user.status}</Td>
                            <Td>
                                {user.status === "대기" && (
                                    <>
                                        <Button onClick={() => handleApprove(user.id)}>승인</Button>
                                        <Button danger onClick={() => handleReject(user.id)}>취소</Button>
                                    </>
                                )}
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

export default StudyManage;
