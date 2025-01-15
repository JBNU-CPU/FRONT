import React, { useState } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import MainPitcture from './Pic/StudyMain.png'
import Slider from "../components/ImgSlider";
import room1 from "../Picture/CPU_Room.jpg";
import room2 from "../Picture/CPU_Room2.jpg";
import map from "../Picture/map.png";
import tree from "../Picture/tree.jpg";
import logo from "../Picture/CPU_logo_full.jpeg";

// 메인 컨테이너 스타일
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? 'gray' : 'white')};
  font-size: 18px;
  cursor: pointer;
  font: bold 17px 'arial';
  padding-bottom: 5px;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? '#ea0079' : 'transparent')};
  &:hover {
    border-bottom: 2px solid #ea0079;
  }
`;

// 이미지와 텍스트 스타일
const Section = styled.div`
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  margin: 10px 0;
`;

const Text = styled.p`
  font: bold 13px 'arial';
  margin: 15px 0;
  text-align: center;
`;

const SectionHeader = styled.h2`
  align-items: center;
  text-align: center;
  font: bold 30px 'arial';
  margin-bottom: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: calc(60%);
  margin-bottom: 20px;
`

const TH = styled.th`
  border: 1px solid black;
  padding: 8px;
  text-align: left;
  text-align: center;
  background-color: #c3c0c0;
  color: black;
  font: bold 14px 'arial';
`
const TD = styled.td`
  border: 1px solid black;
  padding: 8px;
  text-align: left;
  text-align: center;
  background-color: white;
  color: black;
  font: bold 14px 'arial';
`

const H2 = styled.h2`
  font: bold 25px 'arial';
`

// 섹션 컴포넌트
const AboutSection = () => (
  <Section>
    <Image src={logo}/>
    <SectionHeader>Creative Personal computer User Club</SectionHeader>
    <Text>
      CPU는 전북대학교와 주도적인 개인 컴퓨터 사용자 모임으로써 지역 활성화에 힘쓰는 동아리로, 전북 지역 사회의 Computer Mind 가치 확산에 기여하고 있습니다.
    </Text>
    <Text>
      동아리 회원들은 학습 연구 및 평가 교육을 통해 프로그래밍 언어 및 컴퓨터 공학 지식을 체득할 수 있습니다.
    </Text>
  </Section>
);

const LocationSection = () => (
  <Section>
    <SectionHeader>동아리방 위치</SectionHeader>
    <Image src={map} alt="동아리방 위치" />
    <Text>전북대학교 제2공학관 403호</Text>
    <SectionHeader>동아리방 내부</SectionHeader>
    <Image src={room1} alt="동아리방 내부" />
    <Image src={room2} alt="동아리 활동 모습" />
  </Section>
);

const ManagementSection = () => (
  <Section>
    <SectionHeader>운영진</SectionHeader>
    <Image src={tree} alt="조직도" />
    <H2>회장단</H2>
    <Table>
        <tr>
            <TH>직책</TH>
            <TH>이름</TH>
        </tr>
        <tr>
            <TD>회장</TD>
            <TD>이다영</TD>
        </tr>
        <tr>
            <TD>부회장</TD>
            <TD>임정민</TD>
        </tr>
        <tr>
            <TD>총무</TD>
            <TD>박도현</TD>
        </tr>
    </Table>

    <H2>학술부</H2>
    <Table>
        <tr>
            <TH>직책</TH>
            <TH>이름</TH>
        </tr>
        <tr>
            <TD>부장</TD>
            <TD>김동준</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>안 현</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>이진태</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>오예준</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>채민경</TD>
        </tr>
    </Table>

    <H2>인사홍보부</H2>
    <Table>
        <tr>
            <TH>직책</TH>
            <TH>이름</TH>
        </tr>
        <tr>
            <TD>부장</TD>
            <TD>박태정</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>정유민</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>이시연</TD>
        </tr>
    </Table>

    <H2>기획복지부</H2>
    <Table>
        <tr>
            <TH>직책</TH>
            <TH>이름</TH>
        </tr>
        <tr>
            <TD>부장</TD>
            <TD>최유경</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>정서현</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>김락현</TD>
        </tr>
        <tr>
            <TD>부원</TD>
            <TD>신재희</TD>
        </tr>
    </Table>

  </Section>
);

// 메인 컴포넌트
const App = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'location':
        return <LocationSection />;
      case 'management':
        return <ManagementSection />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Slider title="CPU" content="전북대학교 중앙 컴퓨터동아리  CPU"/>
      <Container>
        <TabContainer>
          <TabButton isActive={activeTab === 'about'} onClick={() => setActiveTab('about')}>소개</TabButton>
          <TabButton isActive={activeTab === 'location'} onClick={() => setActiveTab('location')}>동아리방</TabButton>
          <TabButton isActive={activeTab === 'management'} onClick={() => setActiveTab('management')}>운영진</TabButton>
        </TabContainer>
        {renderContent()}
      </Container>
      <Footer />
    </>
  );
};

export default App;
