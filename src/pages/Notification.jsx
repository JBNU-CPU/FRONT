import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header'; // 헤더 컴포넌트 임포트
import Footer from '../components/Footer'; // 푸터 컴포넌트 임포트
import MainPicture from './Pic/StudyMain.png';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 전체 페이지를 감싸는 컨테이너
const Container = styled.div`
  font-family: Arial, sans-serif;
  color: white;
  background: transparent;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderImg = styled.img`
  width: 100%;
  height: 300px;
  opacity: 0.5;
  @media screen and (min-width : 768px) {
      height: 400px;
  }
`;

const PictureWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 30px;
  @media screen and (min-width : 768px) {
      height: 400px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  background: none;
  font-family: 'arial';
  @media screen and (min-width : 768px) {
      top: 140px;
  }
`;

const Summary = styled.p`
  color: white;
  text-align: center;
  position: absolute;
  top: 190px;
  left: 0;
  right: 0;
  background: none;
  font-family: 'arial';
  font-weight: 700;
  @media screen and (min-width : 768px) {
      top: 210px;
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  width: calc(60%);
  @media screen and (max-width : 375px) {
    width: calc(85%);
  }
`;

const Select = styled.select`
  padding: 5px;
  background:transparent;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  @media screen and (max-width : 375px) {
    font: bold 10px 'arial';
  }
`;

const SearchInput = styled.input`
  width: 200px;
  background-color: transparent;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  padding-left: 20px;
  padding-block: 6px;
  width: calc(60%);
  outline: none; /* 기본 브라우저 outline 제거 */
  &:focus {
      border: 1px solid #ab1a65; /* 포커스 시 테두리 색상 변경 */
  }
  @media screen and (max-width : 375px) {
    font: bold 10px 'arial';
  }
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font: bold 13px 'arial';
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ab1a65;
  background: #ab1a65;
  width: 60px;
  transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
  &:hover {
    box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
    transform: scale(1); /* 살짝 확대 */
  }
  @media screen and (max-width : 375px) {
    width: 45px;
    font: bold 11px 'arial';
  }
`;

const Table = styled.table`
  width: calc(80%);
  border-collapse: collapse;
  text-align: center;
`;

const TableHead = styled.th`
  padding: 10px;
  border-bottom: 2px solid #444;
  color: #aaa;
  font: bold 14px 'arial';
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #444;
  font: bold 14px 'arial';
`;

const Pagination = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font: bold 13px 'arial';
  background: #ab1a65;
  margin:20px 10px;
  margin-bottom: 40px;
  transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
  &:hover:not(:disabled) {
    box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
    transform: scale(1); /* 살짝 확대 */
  }
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
  &.write{
    background: transparent;
    border: 1px solid #ab1a65;
    background: #ab1a65;
    margin: 0;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 추가 */
    &:hover {
      box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
      transform: scale(1); /* 살짝 확대 */
    }
    @media screen and (max-width : 375px) {
      width: 50px;
      font: bold 10px 'arial';
    }
  }
  @media screen and (max-width : 375px) {
    width: 40px;
    font: bold 10px 'arial';
  }
`;

const ButtonWrapper = styled.div`
  width: calc(70%); /* 부모 컨테이너의 전체 너비를 차지 */
  display: flex;
  justify-content: flex-end; /* 오른쪽으로 정렬 */
  margin: 20px 0; /* 상하 여백 설정 */
`

const Notification = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/post`, {
          params: {
            page: currentPage - 1, // API의 페이지는 0부터 시작
            size: postsPerPage,
          },
          withCredentials: true,
        });
        console.log(response);
        setPosts(response.data.content); // 데이터의 `content` 부분 사용
        setTotalPages(response.data.totalPages); // 전체 페이지 수
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handleSearch = async () => {
    console.log(`검색 유형: ${searchType}, 검색어: ${searchTerm}`);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/post`, {
        params: {
          [searchType]: searchTerm, // 제목 또는 작성자로 검색
          page: currentPage - 1,
          size: postsPerPage,
        },
        withCredentials: true,
      });
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const writeClick = () => {
    if (isAuthenticated) {
      navigate("/write");
    } else {
      alert("비회원은 접근 불가합니다.");
    }
  };

  const handleClick = (id) => {
    if (isAuthenticated) {
      navigate("/content", {
        state: { id },
      });
    } else {
      alert("비회원은 접근 불가합니다.");
    }
  };

  return (
    <Container>
      <Header />
      <PictureWrapper>
        <HeaderImg src={MainPicture} alt="pic" />
        <Title>공지사항</Title>
        <Summary>각종 CPU 활동 공지가 올라가는 페이지입니다.</Summary>
      </PictureWrapper>

      <SearchSection>
        <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">제목</option>
          <option value="author">작성자</option>
        </Select>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchSection>
      <ButtonWrapper>
        <PageButton className="write" onClick={writeClick}>
          글쓰기
        </PageButton>
      </ButtonWrapper>
      <Table>
        <thead>
          <tr>
            <TableHead scope="col">제목</TableHead>
            <TableHead scope="col">작성자</TableHead>
            <TableHead scope="col">작성일</TableHead>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <TableRow key={post.id} onClick={() => handleClick(post.id)}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PageButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </PageButton>
        {currentPage} / {totalPages}
        <PageButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </PageButton>
      </Pagination>

      <Footer />
    </Container>
  );
};

export default Notification;
