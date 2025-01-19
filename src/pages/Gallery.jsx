import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/ImgSlider";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import img from '../components/SliderImg/img1.png';
import posts from '../posts/GalleryPosts';
import { useContext } from "react";

const Wrap = styled.div`
	width : calc(100%);
	display : flex;
	align-items : center;
	flex-direction : column;
`
const Button = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: calc(60%);
	border-radius: 5px;
	padding: 0;
	border: none;
	cursor: pointer;
	margin: 30px;
	position: relative;

	img {
		width: 100%;
		aspect-ratio: 5/3;
		border-radius: 10px;
		object-fit: cover;
		margin-bottom: 10px;
		transition: transform 0.3s ease, box-shadow 0.3s ease; /* 부드러운 전환 효과 */

		&:hover {
			box-shadow: 0 0 7px #d1cecf; /* 테두리 희미하게 빛남 */
			transform: scale(1.01); /* 이미지 살짝 확대 */
		}
	}

	/* 텍스트와 이미지의 hover 효과 */
	&:hover::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: #ab1a65;
		transition: width 0.3s ease;
	}

	&:hover img::after,
	&:hover span::after {
		width: 100%; /* hover 시 border-bottom 전체 길이 */
	}
`;

const Text = styled.span`
	color: ${(props) => props.color || '#F5F7FF'};
	font: bold ${(props) => props.fontSize || '15px'} 'arial';
	margin-top: 5px;
	position: relative;
	&.title{
		padding-inline: 5px;
	}

	&.title::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background: #ab1a65;
		transition: width 0.3s ease;
	}

	&.title:hover::after {
		width: 100%; /* hover 시 border-bottom 전체 길이 */
	}
`;



const PageIndex = styled.div`
	display : flex;
	align-items : center;
	justify-content : center;
	flex-direction : row;
	margin : 10px;
	p{
		color : white;
		cursor : default;
	}
`
const PageBtn = styled.button`
	margin: 0 5px;
	background-color: rgba(0,0,0,0);
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	display : flex;
	justify-content : center;
	text-align : center;
	&:disabled {
		cursor : default;
	}
`
const ArrowForward = styled(MdOutlineArrowForwardIos)`
  margin-left: 1px;
  color: ${(props) => (props.disabled ? 'grey' : 'white')};
`;
const ArrowBack = styled(MdOutlineArrowBackIos)`
    margin-left: 1px;
    color: ${(props) => (props.disabled ? 'grey' : 'white')};
`;

const Gallery = () => {
	const navigate = useNavigate();
	const [currentPg, setCurrentPg] = useState(0); //현재 페이지
	const itemsPerPg = 5; // 페이지당 나타낼 게시물 수

	const totalPg = Math.ceil(posts.length/itemsPerPg); // 전체 페이지 계산

	const currentItem = posts.slice(currentPg*itemsPerPg, (currentPg+itemsPerPg)); // 현재 페이지에 나타낼 게시물

	const nextPg = () =>{
		if(currentPg<totalPg-1){
			setCurrentPg(currentPg+1);
		}
	};

	const prevPg = () =>{
		if(currentPg>0){
			setCurrentPg(currentPg-1);
		}
	};

	//게시물 접근
	const handleDetail =(id) =>{
		navigate(`/galleryDetail/${id}`);
	}

  return(
		<>
		<Header/>
		<Slider title='갤러리' content='CPU 활동사진들을 기록하는 공간입니다.'/>
			
    	<Wrap>
				{currentItem.map((item)=>(
					<Button key={item.id} onClick={()=>handleDetail(item.id)}>
						<img src={item.image[0]} alt={item.title}/>
						<Text className="title">{item.title}</Text>
						<Text color="#BCC0CF" fontSize="12px">{item.date}</Text>

					</Button>
				))}
				<PageIndex>
					<PageBtn onClick={prevPg} disabled={currentPg===0}><ArrowBack disabled={currentPg===0}/></PageBtn>
					<p style={{font:'bold 13px "arial"'}}>{currentPg+1} / {totalPg}</p>
					<PageBtn onClick={nextPg} disabled={currentPg===totalPg-1}><ArrowForward disabled={currentPg===totalPg-1}/></PageBtn>
				</PageIndex>

    	</Wrap>
			<Footer/>
	</>
	);
};

export default Gallery;


