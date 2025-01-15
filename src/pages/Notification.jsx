import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header'; // 헤더 컴포넌트 임포트
import Footer from '../components/Footer'; // 푸터 컴포넌트 임포트
import MainPitcture from './Pic/StudyMain.png';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 전체 페이지를 감싸는 컨테이너
const Container = styled.div`
  font-family: Arial, sans-serif;
  color: white;
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderImg = styled.img`
  width: 100%;
  height: 250px;
  opacity: 0.5;
  @media screen and (min-width : 768px) {
      height: 400px;
  }
`;

const PictureWrapper = styled.div`
  width: 100%;
  height: 250px;
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
  top: 50px;
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
  top: 120px;
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
`;

const Select = styled.select`
  padding: 5px;
  background:transparent;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
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
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font: bold 13px 'arial';
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #EA0079;
  background: #EA0079;;
  width: 80px;
  &:hover {
    background: gray;
    border: 1px solid gray;
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
  background: #EA0079;
  margin:20px 10px;
  margin-bottom: 40px;
  &:hover {
    background: #777;
  }
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
  &.write{
    background: transparent;
    border: 1px solid #EA0079;
    background: #EA0079;
    margin: 0;
    &:hover{
      cursor: pointer;
      border: 1px solid gray;
      background: gray;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: calc(70%); /* 부모 컨테이너의 전체 너비를 차지 */
  display: flex;
  justify-content: flex-end; /* 오른쪽으로 정렬 */
  margin: 20px 0; /* 상하 여백 설정 */
`

const Community = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const posts = [
    { id: 1, title: 'CPU 동아리 혜택', author: '이다영', date: '24.08.31' },
    { id: 2, title: 'CPU 동아리 가입방법', author: '이다영', date: '24.09.01' },
    { id: 3, title: 'CPU 차기 임원진', author: '이다영', date: '24.09.02' },
    { id: 4, title: 'CPU 세션 개설 현황', author: '김동준', date: '24.09.03' },
    { id: 5, title: 'CPU 스터디 개설 현황', author: '김동준', date: '24.09.04' },
    { id: 6, title: '박도현의 은밀한 사생활', author: '박도현', date: '24.09.05' },
    { id: 7, title: '첫번째 네트워킹 데이', author: '김동준', date: '24.09.06' },
    { id: 8, title: '친해지길 바라 신청', author: '최유경', date: '24.09.07' },
    { id: 9, title: '박도현의 박관소', author: '박도현', date: '24.09.08' },
    { id: 10, title: '개발자 하지마세요!', author: '김동준', date: '24.09.09' },
  ];

  const handleSearch = () => {
    console.log(`검색 유형: ${searchType}, 검색어: ${searchTerm}`);
  };

  // 현재 페이지의 포스트 목록
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const writeClick = () => {
    if(isAuthenticated){
      navigate('/notiwrite');
    }else{
      alert("임원진만 접근 가능합니다.");
    }
  };

  const handleClick = (id) => {
    if (isAuthenticated) {
        navigate('/noticontent',{
          state:{id}
        });
    } else {
        alert('비회원은 접근 불가합니다.');
    }
  };

  return (
    <Container>
      <Header />
      <PictureWrapper>
        <HeaderImg src={MainPitcture} alt="pic" />
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
        <PageButton className='write' onClick={writeClick}>글쓰기</PageButton>
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
          {currentPosts.map((post) => (
            <TableRow key={post.id} onClick={handleClick}>
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

export default Community;
