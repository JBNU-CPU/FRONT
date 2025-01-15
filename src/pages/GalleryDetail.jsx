import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Carousel} from 'react-responsive-carousel'; //npm install react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";

import posts from '../posts/GalleryPosts';
import List_Btn from "../components/List_Btn";

const Container = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
`;
const MainWrap = styled.div`
  width : 90%;
  background: transparent;
  display : flex;
  flex-direction : column;
  padding : 5%;
`;
const Title = styled.text`
  color : #F5F7FF;
  font-size : 25px;
  background-color : rgba(0,0,0,0);
  margin-top : 20px;
`;
const Line = styled.div`
  width : 100%;
  height : 2px;
  background-color : #6F7486;
  align-self : center;
  margin : 10px 0 5px 0;
`;
const InfoWrap = styled.div`
  align-self : end;
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : center;
  background-color : rgba(0,0,0,0);
  margin-bottom : 10px;
  
`;
const InfoT = styled.text`
  color : #BCC0CF;
  font-size : 10px;
  background-color : rgba(0,0,0,0);
`;
const ContentWrap = styled.div`
  width : 95%;
  background-color : rgba(0,0,0,0);
  align-self : center;
  margin : 10px;

`;
const ContentT = styled.text`
  color : #BCC0CF;
  font-size : 14px;
  background-color : rgba(0,0,0,0);
`;
const StyledCarousel = styled(Carousel)`
  margin : 10px 0 10px 0;
  background: transparent;
  .slide{
    display : flex;
    justify-content : center;
    align-items : center;
  }
  .slide img{
    width : 90%;
    height : auto;
    border-radius : 5px;
  }
  .control-dots {
    flex-direction : row;
    display : flex;
    justify-content : center;
    background: none;
  }
  .thumbs-wrapper {
    margin: 0 5%;
    display : flex;
    align-items : center;
    justify-content : flex-start;
  }
  .thumbs{
    display : flex;
    justify-content :center;
    align-items : center;
    padding : 0;
  }
  .thumb{
    width : 60px !important;
    height : 50px;
    border : none;
    border-radius: 5px;
    overflow: hidden;
    display : flex;
    justify-content : center;
    align-items : center;
    margin : 0 5px;
  }
  img{
    width : 100%;
    height : 100%;
    object-fit : cover;
    border-radius : 5px;
  }
  .thumb.selected{
    border : 1.5px solid #BCC0CF;
  }
  .thumb:hover {
    opacity: 0.8;
    cursor : pointer;
}
  .carousel-status {
    display: none; /* 요소를 숨깁니다 */
}

`
const CustomIndicator = styled.div`
  width: 5px; /* 인디케이터 크기 */
  height: 5px;
  background-color: ${(props) => (props.active ? "#f5f7ff" : "#6F7486")};
  border-radius: 50%;
  margin: 0 5px; /* 간격 */
  cursor: pointer;
  &:hover {
    background-color: #f5f7ff; /* 호버 효과 */
    
  }
`;

const GalleryDetail=()=>{

  const {id} = useParams();
  const navigate = useNavigate();
  const post = posts.find((item)=>item.id === parseInt(id));
  
  useEffect(() => {
    if (!post) {
      alert('해당 게시물을 찾을 수 없습니다.');
      navigate('/gallery');
    }
  }, [post, navigate]);

  //줄바꿈(엔터) 처리
  const enterDescription = post.description.split('\n').map((line, index) => (
    <ContentT key={index}>
      {line}
      <br />
    </ContentT>
  ));
  
  const renderIndicator = (onClickHandler, isSelected)=>{
    return(
      <CustomIndicator
        active={isSelected}
        onClick={onClickHandler}
        />
    );
  }

  return(
    <>
    <Header/>
    <Container>
      <MainWrap>
        <Title>{post.title}</Title>
        <Line/>
        <InfoWrap>
          <InfoT>{post.author} | {post.date} | </InfoT>
        </InfoWrap>
        <ContentWrap>
          {enterDescription}
        </ContentWrap>
        <StyledCarousel
          useKeyboardArrows
          autoPlay={false}
          swipeable
          emulateTouch
          renderIndicator={renderIndicator}
        >
          {post.image.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Image ${index}`} />
            </div>
          ))}
        </StyledCarousel>
      </MainWrap>
      <List_Btn/>


    </Container>
    <Footer/>
  


    </>

  );


}

export default GalleryDetail;
