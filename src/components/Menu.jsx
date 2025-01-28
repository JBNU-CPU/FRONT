import React, { useContext, useState, useRef,  useEffect} from "react";
import styled from "styled-components";
import logo from './logo/CPU_logo_white.png';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import AdminContext from "../AdminContext";
import axios from "axios";

const Container = styled.div`
    width: calc(40%);
    background: #1b1d25;
    position: fixed;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    top: 60px;
    @media screen and (max-width : 480px) {
        width: calc(70%);
    }
    @media screen and (max-width : 1023px) {
        height: 100%;
    }
    @media screen and (min-width : 1024px) {
        width: 80%;
        top: 0;
        min-height: 80px;
    }
`;


const LogoWrapper = styled(Link)`
    display: flex;
    justify-content: center;
    background: none;
    padding: 10px;
    @media screen and (min-width: 1024px){
        display: none;
    }
`;

const Logo = styled.img`
    background: none;
    width: 90px;
    height: 90px;
    margin-top: 50px;
    @media screen and (max-width : 700px) {
        width: 80px;
        height: auto;
    }
    @media screen and (min-width: 1024px){
        display: none;
    }
`;

const MenuWrapper = styled.ul`
    list-style: none;
    background: none;
    font: bold 23px 'arial';
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 18px;
    @media screen and (max-width : 700px) {
       font-size: 18px;
    }
    @media screen and (min-width: 1024px) {
        display: flex;
        position: absolute;
        width:90%;
        bottom:0;
        right : 10%;
        justify-content: end;
    }
`;
const MenuBox = styled.div`
    @media screen and (min-width: 1024px) {
        margin: 0 10px 0 10px;
        text-align: center;
        width:160px;
        justify-content: center;
    }
`;

const Menuli = styled.li`
    color: white;
    background: none;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
    transition: text-shadow 0.3s ease, transform 0.3s ease; /* 부드러운 전환 효과 추가 */
    @media screen and (min-width: 1024px) {
        align-self: end;
        white-space: nowrap;
        justify-content:center;
        padding-top: 0px;
        padding-bottom: 10px;
    }
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
    @media screen and (min-width: 1024px) {
        display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
        position: absolute;  /* 헤더 내부에서 드롭다운을 띄우기 위한 absolute */
        top: 100%;  /* 헤더 바로 아래로 위치하도록 top을 100%로 설정 */
        background: rgba(0,0,0,0.3);
        z-index: 1002;  /* 드롭다운 메뉴가 다른 요소 위로 보이도록 z-index 설정 */
    }
`;

const SubMenu = styled.ul`
    background: none;
    border-top: 2px solid #ab1a65;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 150px;
    font: bold 17px 'arial';
    @media screen and (max-width : 700px) {
        font-size: 15px;
        width: calc(70%);
    }
    @media screen and (min-width : 1024px) {
        width:160px;
        padding-top:10px;
        justify-content: center;
    }
`;

const LoginWrapper = styled.div`
    background: none;
    display: flex;
    justify-content: center;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-top:10px;
    @media screen and (min-width: 1024px) {
        position: absolute;
        top:0;
        right:0;
        flex-direction: row;
        align-self:start;
        margin: 15px 25px 0 0;
    }
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
        width: 60px;
        height: 25px;
        font-size: 12px;
    }
    @media screen and (min-width: 1024px) {
        font: normal 13px 'arial';
        width: 60px;
        height: 25px;
    }    
`;


const StyledLink = styled(Link)`
    background: none;
    text-decoration: none;
    color: white;
`;

const Mypage = styled.p`
    color: white;
    margin: 20px 0 20px 0;
    font: bold 13px 'arial';
    &:hover{
        cursor: pointer;
    }
    @media screen and (max-width : 700px) {
        font-size: 12px;
    }
    @media screen and (min-width: 1024px) {
        align-self:center;
        margin: 0 10px 0 0;
        white-space: nowrap;
        font: normal 13px 'arial';
    }    
`

const Menu = ({closeMenu}) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { isAdmin } = useContext(AdminContext);
    const menuRef = useRef(null);
    //화면 사이즈 (데스크탑)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

    useEffect(()=>{
        const handleResize = () => setIsDesktop(window.innerWidth>=1024); //사이즈 감지
        window.addEventListener("resize",handleResize); //창 크기 변경 시 발생
        return ()=> window.removeEventListener("resize",handleResize);
    },[]);

    // 상위 메뉴 클릭 시
    const toggleMenu = (menuName) => {
        setOpenMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
    };

    const handleSubMenuClick = (tab) => {
        navigate('/studymain', { state: { tab } });
        closeMenu();
    };

    const handlemypage = () => {
        navigate('/mypage');
        closeMenu();
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
            <LogoWrapper to="/" onClick={() => closeMenu()}>
                <Logo src={logo} />
            </LogoWrapper>
            <MenuWrapper>
                <MenuBox>
                <Menuli><StyledLink to='/about' onClick={() => closeMenu()}>About CPU</StyledLink></Menuli>
                </MenuBox>
                <MenuBox>
                <Menuli
                    onClick={!isDesktop? () => toggleMenu("study") : undefined}
                    onMouseEnter={isDesktop ? () => setOpenMenu("study") : undefined}
                    onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                >
                    Study
                </Menuli>
                {openMenu === "study" && (
                    <SubMenuWrapper 
                        onMouseEnter={isDesktop ? () => setOpenMenu("study") : undefined}
                        onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                        isOpen={openMenu === "study"}>
                        <SubMenu>
                            <Menuli style={{ color: '#ffffff' }} onClick={() => handleSubMenuClick('section')}>세션</Menuli>
                            <Menuli style={{ color: '#ffffff' }} onClick={() => handleSubMenuClick('study')}>스터디</Menuli>
                            <Menuli style={{ color: '#ffffff' }} onClick={() => handleSubMenuClick('project')}>프로젝트</Menuli>
                        </SubMenu>
                    </SubMenuWrapper>
                )}
                </MenuBox>
                <MenuBox>
                <Menuli
                    onClick={!isDesktop? () => toggleMenu("board") : undefined}
                    onMouseEnter={isDesktop ? () => setOpenMenu("board") : undefined}
                    onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                >
                    Board
                </Menuli>
                {openMenu === "board" && (
                    <SubMenuWrapper 
                        onMouseEnter={isDesktop ? () => setOpenMenu("board") : undefined}
                        onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
                        isOpen={openMenu === "board"}
                    >
                        <SubMenu>
                            <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/notification' onClick={() => closeMenu()}>공지사항</StyledLink></Menuli>
                            <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/community' onClick={() => closeMenu()}>커뮤니티</StyledLink></Menuli>
                            <Menuli style={{ color: '#C0C0C0' }}><StyledLink to='/gallery' onClick={() => closeMenu()}>갤러리</StyledLink></Menuli>
                        </SubMenu>
                    </SubMenuWrapper>
                )}
                </MenuBox>
                <MenuBox><Menuli><a href="https://docs.google.com/forms/d/e/1FAIpQLSdRVK-FqquWklAH8BZO69FnnGzRnioZ51jf3OpBXnUMGvDeUQ/viewform?usp=dialog" style={{ background: "none", textDecoration: "none", color: "white" }}>Recruit</a></Menuli></MenuBox>
                {isAdmin && ( // isAdmin이 true일 때만 Management 표시
                    <MenuBox><Menuli><StyledLink to='/management' onClick={() => closeMenu()}>Management</StyledLink></Menuli></MenuBox>
                )}
            </MenuWrapper>
            <LoginWrapper>
                {isAuthenticated ? (
                    <>
                        <Mypage onClick={handlemypage}>마이페이지</Mypage>
                        <Login onClick={handleLogout}>
                            <StyledLink to='/'>Log out</StyledLink>
                        </Login>
                    </>
                ) : (
                    <Login>
                        <StyledLink to='/login' onClick={() => closeMenu()}>Log in</StyledLink>
                    </Login>
                )}
            </LoginWrapper>
        </Container>
    );
};

export default Menu;
