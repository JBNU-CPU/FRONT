import React, { useContext, useState, useRef,  useEffect} from "react";
import styled from "styled-components";
import logo from './logo/CPU_logo_white.png';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import AdminContext from "../AdminContext";
import axios from "axios";

const Container = styled.div`
    width: calc(30%);
    height: 100%;
    background: #1b1d25;
    position: fixed;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    top: 60px;
    @media screen and (max-width : 700px) {
        width: calc(40%);
    }
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
    margin-top: 50px;
    @media screen and (max-width : 700px) {
        width: 50px;
        height: auto;
    }
`;

const MenuWrapper = styled.ul`
    list-style: none;
    background: none;
    font: bold 25px 'arial';
    text-align: center;
    margin: 0;
    padding: 0;
    @media screen and (max-width : 700px) {
       font-size: 13px;
    }
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
    font: bold 20px 'arial';
    @media screen and (max-width : 700px) {
       font-size: 11px;
       width: calc(70%);
    }
`;

const LoginWrapper = styled.div`
    background: none;
    display: flex;
    justify-content: center;
    position: relative;
    top: 30px;
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
    @media screen and (max-width : 700px) {
        width: 50px;
        height: 20px;
        font-size: 9px;
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
    @media screen and (max-width : 700px) {
        font-size: 9px;
    }
`

const Menu = ({closeMenu}) => {
    const navigate = useNavigate();
    const [isStudyOpen, setIsStudyOpen] = useState(false);
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { isAdmin } = useContext(AdminContext);
    const menuRef = useRef(null);

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

    const handlemypage = () => {
        navigate('/mypage');
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
                withCredentials: true, // 쿠키 포함
            });

            if (response.status === 200) {
                // 로그아웃 성공
                alert("로그아웃 되었습니다.");
                setIsAuthenticated(false);
                localStorage.removeItem('username');
                navigate('/'); // 홈으로 이동
            } else {
                console.error("로그아웃 실패:", response);
                alert("로그아웃에 실패했습니다.");
            }
        } catch (error) {
            console.error("로그아웃 요청 중 오류 발생:", error);
            alert("로그아웃 중 문제가 발생했습니다.");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const hamburgerButton = document.querySelector('.hamburger-icon');
            if ((menuRef.current && !menuRef.current.contains(event.target)) ||
            (hamburgerButton && hamburgerButton.contains(event.target))){
                closeMenu(); // 메뉴 닫기 함수 호출
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu]);

    return (
        <Container ref={menuRef}>
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
                <Menuli><a href="https://docs.google.com/forms/d/e/1FAIpQLSdRVK-FqquWklAH8BZO69FnnGzRnioZ51jf3OpBXnUMGvDeUQ/viewform?usp=dialog" style={{ background: "none", textDecoration: "none", color: "white" }}>Recruit</a></Menuli>
                {isAdmin && ( // isAdmin이 true일 때만 Management 표시
                    <Menuli><StyledLink to='/management'>Management</StyledLink></Menuli>
                )}
            </MenuWrapper>
            <LoginWrapper>
                {isAuthenticated ? (
                    <>
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
