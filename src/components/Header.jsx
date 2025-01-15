import React,{useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from './logo/CPU_logo_white.png';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const MainHeader = styled.header`
    width : 100%;  
    height: 60px;
    background: #1b1d25;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    position: fixed; /* 화면에 고정 */
    top: 0; /* 화면 상단에 위치 */
    left: 0; /* 왼쪽부터 채움 */
    right: 0; /* 오른쪽까지 채움 */
    z-index: 1000; /* 다른 요소 위로 보이도록 z-index 설정 */
    @media screen and (min-width : 768px) {
        justify-content: flex-start;
    }
`;

const Text = styled.p`
    display: inline;
    color: white;
    background: none;
    padding-left: 10px;
    font: bold 20px 'arial';
    margin : 0;
    margin-left: 20px;
    @media screen and (max-width: 768px){
        display: none;
    }
    &:hover{
        cursor: pointer;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    @media screen and (min-width : 768px) {
        padding-left: 20px;
    }
`

const ImgLink = styled(Link)`
    width: 50px;
    height: 50px;
    background: black;
    padding: 0;
    margin: 0;
`

const Hamburger = styled(GiHamburgerMenu)`
    color: white;
    background: #1b1d25;
    width: 31px;
    height: 31px;
    position: absolute;
    right: 20px;
    cursor: pointer;
    z-index: auto;
    &:hover{
        color: gray;
    }
`

// to경로 메인 페이지로 이동하도록 설정하기
const Header = () => {
    const [MenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const ToggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const Click = () => {
        navigate('/');
    }

    return(
        <MainHeader>
            <ImgLink to = '/'><Img src={logo} alt="cpu_white_logo"/></ImgLink><Text onClick={Click}>C P U</Text> 
            <Hamburger onClick = {ToggleMenu}/>{MenuOpen && <Menu/>}
        </MainHeader>
    );
};

export default Header;