import React, { useContext, useState } from "react";
import styled from "styled-components";
import logo from './logo/CPU_logo_white.png';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import AdminContext from "../AdminContext";

const Container = styled.div`
    width: calc(40%);
    height: 100%;
    background: #1b1d25;
    position: fixed;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    top: 60px;
`;

const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    background: none;
    padding: 10px;
`;

const Logo = styled.img`
    background: none;
    width: 90px;
    height: 90px;
`;

const MenuWrapper = styled.ul`
    list-style: none;
    background: none;
    font: bold 20px 'arial';
    text-align: center;
    margin: 0;
    padding: 0;
`;

const Menuli = styled.li`
    color: white;
    background: none;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
    transition: text-shadow 0.3s ease, transform 0.3s ease; /* 부드러운 전환 효과 추가 */

    &:hover {
        text-shadow: 0 0 10px #d1cecf; /* 글자 주변 빛나는 효과 */
        transform: scale(1.05); /* 살짝 확대 */
    }

    &:active {
        text-shadow: 0 0 15px #d1cecf; /* 클릭 시 빛나는 효과 강화 */
        transform: scale(1); /* 클릭 시 원래 크기로 복귀 */
    }
`;


const SubMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
    background: none;
`;

const SubMenu = styled.ul`
    background: none;
    border-top: 2px solid #ab1a65;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 150px;
    font: bold 15px 'arial';
`;

const LoginWrapper = styled.div`
    background: none;
    display: flex;
    justify-content: center;
    position: relative;
    top: 100px;
    flex-direction: column;
    align-items: center;
`;

const Login = styled.button`
    align-items: center;
    border: 1.5px solid #ab1a65;
    border-radius: 5px;
    background: none;
    font: bold 12px 'arial';
    font-weight: 700;
    width: 70px;
    height: 30px;
    color: white;
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(171, 26, 101, 0.8); /* hover 시 희미하게 빛나는 효과 */
        transform: scale(1); /* 살짝 확대 */
        a{
            color: gray;
        }
    }
`;


const StyledLink = styled(Link)`
    background: none;
    text-decoration: none;
    color: white;
`;

const Mypage = styled.p`
    color: white;
    margin: 30px 0;
    font: bold 13px 'arial';
    &:hover{
        cursor: pointer;
    }
`

const Menu = () => {
    const navigate = useNavigate();
    const [isStudyOpen, setIsStudyOpen] = useState(false);
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
    const {isAdmin,} = useContext(AdminContext);

    const handleStudyClick = () => {
        setIsStudyOpen(prev => !prev);
        setIsBoardOpen(false);
    };

    const handleBoardClick = () => {
        setIsBoardOpen(prev => !prev);
        setIsStudyOpen(false);
    };

    const handleSubMenuClick = (tab) => {
        navigate('/studymain', { state: { tab } });
    };

    const handlemypage = () =>{
        navigate('/mypage');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('username');
        window.location.reload();
    }

    return (
        <Container>
            <LogoWrapper>
                <Logo src={logo} />
            </LogoWrapper>
            <MenuWrapper>
                <Menuli><StyledLink to='/about'>About CPU</StyledLink></Menuli>
                <Menuli onClick={handleStudyClick}>Study</Menuli>
                {isStudyOpen && (
                    <SubMenuWrapper>
                        <SubMenu>
                            <Menuli style={{ color: '#C0C0C0' }} onClick={() => handleSubMenuClick('section')}>세션</Menuli>
                            <Menuli style={{ color: '#C0C0C0' }} onClick={() => handleSubMenuClick('study')}>스터디</Menuli>
                            <Menuli style={{ color: '#C0C0C0' }} onClick={() => handleSubMenuClick('project')}>프로젝트</Menuli>
                        </SubMenu>
                    </SubMenuWrapper>
                )}
                <Menuli onClick={handleBoardClick}>Board</Menuli>
                {isBoardOpen && (
                    <SubMenuWrapper>
                        <SubMenu>
                            <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/notification'>공지사항</StyledLink></Menuli>
                            <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/community'>커뮤니티</StyledLink></Menuli>
                            <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/gallery'>갤러리</StyledLink></Menuli>
                        </SubMenu>
                    </SubMenuWrapper>
                )}
                <Menuli><StyledLink to='/recruit'>Recruit</StyledLink></Menuli>
                {isAdmin && ( // isAdmin이 true일 때만 Management 표시
                    <Menuli><StyledLink to='/management'>Management</StyledLink></Menuli>
                )}
            </MenuWrapper>
            <LoginWrapper>
                {isAuthenticated?(<>
                    <Login onClick={handleLogout}>
                        <StyledLink to='/'>Log out</StyledLink>
                    </Login>
                    <Mypage onClick={handlemypage}>마이페이지</Mypage>
                </>
                ) : (
                    <Login>
                        <StyledLink to='/login'>Log in</StyledLink>
                    </Login>
                )}
            </LoginWrapper>
        </Container>
    );
};

export default Menu;
