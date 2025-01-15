import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/ImgSlider";
import Detail_Btn from "../components/Detail_Btn";

import studyImg from "../components/SliderImg/img1.png";

const Wrap = styled.div`
	display : flex;
	width : 100%;
	flex-direction : column;
	align-items : center;
`;
const MainWrap = styled.div`
	display : flex;
	width : 80%;
	height : 100%;
	flex-direction : column;
	align-items : center;
	@media screen and (min-width : 768px) {
    width : 70%;
  }
	h1{
		background-color : rgba(0,0,0,0);
		color : #F5F7FF;
		font-size : 25px;
		margin-top : 50px;
		margin-bottom : 0;
		@media screen and (min-width : 768px) {
			font-size : 40px;
  	}
	}
	p{
		background-color : rgba(0,0,0,0);
		color : #F5F7FF;
		font-size : 14px;
		line-height: 2;
		margin : 0;
		text-align : center;
		@media screen and (min-width : 768px) {
			font-size : 16px;
			width : 90%;
  	}
	}
	img{
		width : 100%;
		aspect-ratio: 5/3;
		margin : 10px 0;
		border-radius : 10px;
		object-fit: cover;
	}
`
const Line = styled.div`
	width : 40%;
	height : 2px;
	background-color : #EA0079;
	margin : 10px;
`
const Button = styled.button`
	display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
		border: none;
    background: #EA0079;
    font: bold 12px 'arial';
    font-weight: 700;
    width: 100px;
    height:35px;
    color : white;
    margin-top : 30px;
		margin-bottom : 100px;
    cursor: pointer;
`


const Main = () => {
	const navigate = useNavigate();

	const handleRecruit = ()=>{
		navigate('/recruit')


	};

  return(
  <Wrap>
    <Header/>
    <Slider title="CPU" content="전북대학교 중앙 컴퓨터동아리  CPU"/>
    <MainWrap>
			<h1>CPU</h1>
			<Line/>
			<p>전북대학교 중앙동아리 유일 학술 컴퓨터 동아리인
CPU는 전북 지역 컴퓨터 동아리의 선구자로서 주도적인
역할을 해왔으며, 다양한 배경을 가진 학생들과 교류하며
서로가 배울 수 있는 가르침의 장을 만들어가고 있습니다.</p>
			<Detail_Btn navigation='about'/>
			<h1>Study</h1>
			<Line/>
			<img src={studyImg}  alt="study"/>
			<p>부원들의 코딩 역량 향상을 위한 기본스터디와
			자율스터디를 운영하고 있습니다.</p>
			<Detail_Btn navigation='study'/>
			<h1>Activity</h1>
			<Line/>
			<img src={studyImg}  alt="study"/>
			<p>격주로 진행되는 세미나를 통해 부원들과 함께 소통하고 
			서로의 지식을 공유하는 자리를 마련하고 있습니다.</p>
			<img src={studyImg}  alt="study"/>
			<p>학기 말 CPU 데이를 개최하여
기본스터디와 자율스터디를 통해 이뤄낸 부원들의 성과를
독려하는 시간을 갖고 있습니다.</p>
			<Detail_Btn navigation='gallery'/>
			<p/>
			<h1>CPU와 함께하고 싶다면</h1>
			<Button onClick={handleRecruit}>
        <p>지원하기</p>
      </Button>
    </MainWrap>
		<Footer/>
  </Wrap>
  );
};





export default Main;