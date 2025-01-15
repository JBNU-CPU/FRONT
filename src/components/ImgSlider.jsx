import React, {useState, useEffect} from "react";
import styled from "styled-components";
import img1 from "./SliderImg/img1.png";
import img2 from "./SliderImg/img2.png";
import img3 from "./SliderImg/img3.png";
import img4 from "./SliderImg/img4.png";
import img5 from "./SliderImg/img5.png";

const images = [ img1, img2, img3, img4, img5 ];

const Slider = styled.div`
  position : relative;
  width : 100%;
  height : 300px;
  overflow : hidden;
  @media screen and (min-width : 768px) {
    height : 500px;
  }
`;
const Images = styled.div`
  position : absolute;
  top : 0;
  left : 0;
  width : 100%;
  height : 100%;
  background-size : cover;
  background-position : center;
  transition: opacity 2s ease-in-out;
  opacity : 0;
  filter : blur(1px);
  &.active {
    opacity : 1;
  }
  &:before { 
    content : "";
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background-color : rgba(0, 0, 0, 0.3);
  }
`
const TitleWrap = styled.div`
  position : absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%);
  color : #F5F7FF;
  background-color : rgba(0, 0, 0, 0);
  width : 100%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  text-align : center;
  cursor : default;
  h1{
    margin : 0;
    font-size : 50px;
    background-color : rgba(0,0,0,0);
    text-shadow : 1px 1px 5px rgba(0, 0, 0, 0.7);
  }
  p{
    margin : 0;
    font-size : 16px;
    background-color : rgba(0,0,0,0);
    text-shadow : 1px 1px 5px rgba(0, 0, 0, 0.7);

  }
`


const ImgSlider = ({title, content=""})=>{

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentIndex((prevIndex)=>(prevIndex+1)%images.length);
    },5000); 
    
    return () => clearInterval(interval);
  })

  return(
    <Slider>
      {images.map((image, index)=>(
        <Images
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <TitleWrap>
        <h1>{title}</h1>
        <p>{content}</p>
      </TitleWrap>
    </Slider>

  );

}
export default ImgSlider;