import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/ImgSlider";
import Detail_Btn from "../components/Detail_Btn";
import studyImg from "../components/SliderImg/img1.png";
import { MdKeyboardArrowUp } from "react-icons/md";

const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const MainWrap = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
  h1 {
    background-color: rgba(0, 0, 0, 0);
    color: #f5f7ff;
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 0;
    border-bottom: 2px solid #ab1a65;
    padding: 0px 20px 10px 20px;
    &.bottom {
      border: none;
    }
    @media screen and (min-width: 768px) {
      font-size: 40px;
    }
  }
  p {
    background-color: rgba(0, 0, 0, 0);
    color: #f5f7ff;
    font: 400 13px "arial";
    line-height: 2;
    margin: 0;
    text-align: center;
    padding-block: 10px;
    &.font {
      font: bold 13px "arial";
    }
    @media screen and (min-width: 768px) {
      width: 90%;
      font: 400 15px "arial";
      line-height: 2;
    }
  }
  img {
    width: 100%;
    aspect-ratio: 5/3;
    margin: 20px 0 0 0;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  background: #ab1a65;
  font: bold 12px "arial";
  font-weight: 700;
  width: 100px;
  height: 35px;
  color: white;
  margin: 10px 0 80px 0;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px rgba(171, 26, 101, 0.8);
    transform: scale(1.05);
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #c5bfc2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: 0 0 15px #c5bfc2;
    transform: scale(1.1);
  }
  svg {
    font-size: 24px;
	background: transparent;
  }
`;

const Main = () => {
  const navigate = useNavigate();
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  const handleRecruit = () => {
    navigate("/recruit");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrap>
      <Header />
      <Slider title="CPU" content="전북대학교 중앙 컴퓨터동아리  CPU" />
      <MainWrap>
        <h1>CPU</h1>
        <p>
          전북대학교 중앙동아리 유일 학술 컴퓨터 동아리인 CPU는 전북 지역 컴퓨터
          동아리의 선구자로서 주도적인 역할을 해왔으며, 다양한 배경을 가진
          학생들과 교류하며 서로가 배울 수 있는 가르침의 장을 만들어가고
          있습니다.
        </p>
        <Detail_Btn navigation="about" />
        <h1>Study</h1>
        <img src={studyImg} alt="study" />
        <p>
          부원들의 코딩 역량 향상을 위한 기본스터디와 자율스터디를 운영하고
          있습니다.
        </p>
        <Detail_Btn navigation="study" />
        <h1>Activity</h1>
        <img src={studyImg} alt="study" />
        <p>
          격주로 진행되는 세미나를 통해 부원들과 함께 소통하고 서로의 지식을
          공유하는 자리를 마련하고 있습니다.
        </p>
        <img src={studyImg} alt="study" />
        <p>
          학기 말 CPU 데이를 개최하여 기본스터디와 자율스터디를 통해 이뤄낸
          부원들의 성과를 독려하는 시간을 갖고 있습니다.
        </p>
        <Detail_Btn navigation="gallery" />
        <h1 className="bottom">CPU와 함께하고 싶다면</h1>
        <Button onClick={handleRecruit}>
          <p className="font">지원하기</p>
        </Button>
      </MainWrap>
      {isScrollVisible && (
        <ScrollToTopButton onClick={scrollToTop}>
          <MdKeyboardArrowUp />
        </ScrollToTopButton>
      )}
      <Footer />
    </Wrap>
  );
};

export default Main;
