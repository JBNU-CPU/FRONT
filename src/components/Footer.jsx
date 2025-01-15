import styled from "styled-components";
import logo from './logo/CPU_logo_full.jpeg'
import { GrInstagram } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 280px;
    background: #024387;
    overflow-x: hidden;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    width: calc(100%);
    background: transparent;
    padding:30px;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    background: none;
`;

const Logo = styled.img`
    height: 35px;
    width: 35px;
    margin-right: 10px;
`;

const Name = styled.p`
    font-size: 12px;
    margin: 0;
    font-weight: 500;
    color: white;
    white-space: nowrap;
    background: transparent;
`;

const Icons = styled.div`
    display: flex;
    gap: 20px; 
    background: #024387;
    position: absolute;
    right: 30px;
`;

const Insta = styled(GrInstagram)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: white;
    background: transparent;

`;

const Github = styled(BsGithub)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: white;
    background: transparent;

`;

const StyledLink = styled(Link)`
    background: transparent;

`;

const Main = styled.div`
    margin: 0;
    padding: 0;
    background: none;
    padding: 30px;
    padding-top: 0px;
    font-size: 12px;
    color: white;
`
const StyledP = styled.p`
    background: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
`


const Footer = () => {
    return (
        <Container>
            <Top>
                <LogoWrapper>
                    <Logo src={logo} alt="cpu_logo_full" />
                    <Name>전북대학교<br />중앙 학술 컴퓨터 동아리 CPU</Name>
                </LogoWrapper>
                <Icons>
                    <StyledLink to="https://www.instagram.com/cpu_jbnu/"><Insta /></StyledLink>
                    <StyledLink to="https://github.com/JBNU-CPU"><Github /></StyledLink>
                </Icons>
            </Top>
            <Main>
                <StyledP style={{fontWeight:'700', paddingBottom:'10px'}}>CONTACT</StyledP>
                <StyledP style={{paddingBottom:'10px'}}>지도 교수 : 조형기 교수님(전북대학교 전자공학부)</StyledP>
                <StyledP>회장 : 이다영 000-000-000</StyledP>
                <StyledP style={{paddingBottom:'10px'}}>부회장 : 임정민 000-000-000</StyledP>
                <StyledP style={{paddingBottom:'10px'}}>E-mail : jbnucpu@gmail.com</StyledP>
                <StyledP>전북 전주시 덕진동 1가 663</StyledP>
                <StyledP>전북대학교 전주캠퍼스 제2학생회관 403호</StyledP>
            </Main>
        </Container>
    );
};

export default Footer;
