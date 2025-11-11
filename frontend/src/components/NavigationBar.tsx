import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import colors from "../styles/colors";
import logo from "../assets/logo.png"

const MainBar = styled.ul`
    margin: 0 auto;
    padding: 0;
    display: flex;
    list-style: none;
`;

const Logo = styled.div`
    width: 80px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Menu = styled.li<{ $active?: boolean }>`
    width: 300px;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    text-align: center;
    z-index: 15;
    transition: all 0.3s ease;
    font-weight: ${({ $active }) => ($active ? 600 : 400)};
    & > a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 60px;
        position: relative;
        text-decoration: none;
        color: ${({ $active }) => ($active ? colors.pink : "#ffffff")};
        &:hover + ul {
            display: block;
        }
    }
    & > a::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${({ $active }) => ($active ? "100%" : "0")};
        height: 5px;
        background-color: ${colors.pink};
        transition: width 0.3s ease;
    }
    & > a:hover::after {
        width: 100%;
    }
    &:hover > a, &:hover > span {
        font-weight: 600;
        color: ${colors.pink};
    }
    &:hover > ul {
        display: block;
    }
`;

const SubBar = styled.ul`
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${colors.mainLight};
`;

const SubMenu = styled.li`
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    text-align: center;
    a {
        color: #FFFFFF;
        text-decoration: none;
    }
    &:hover {
        background-color: ${colors.main};
    } 
`;

export default function NavigationBar() {
  const location = useLocation();
  return (
    <nav className="navigation">
      <MainBar className="navbar">
        {/* 로고 이미지 */}
        {/* <Link to="/"><Logo className="logo"><img src={logo} alt="Logo" width={50} height={50}></img></Logo></Link> */}
        
        {/* 상단 메뉴 */}
        <Menu $active={location.pathname === "/"}><Link to="/">대시보드</Link></Menu>
        <Menu $active={location.pathname.startsWith("/question")}><Link to="/question/progress">질문하기</Link>
          {/* <SubBar>
            <SubMenu><Link to="/question/inquiry">규정 확인 · 문의</Link></SubMenu>
            <SubMenu><Link to="/question/progress">이수 현황 · 수강 계획</Link></SubMenu>
          </SubBar> */}
        </Menu>
        <Menu $active={location.pathname.startsWith("/requirement")}><Link to="/requirement">규정 확인</Link></Menu>
        <Menu $active={location.pathname.startsWith("/faq")}><Link to="/faq">규정 FAQ</Link></Menu>
      </MainBar>
    </nav>
  );
}