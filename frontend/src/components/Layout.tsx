import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import colors from "../styles/colors";

const HTMLContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background: ${colors.main};
`;

const NavContainer = styled.div`
    width: 100vw;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: ${colors.main};
    display: flex;
    justify-content: center;
`;

const NavInner = styled.div`
    width: 1200px;
    left: -200;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BodyContainer = styled.div`
    width: 100vw;
    min-height: calc(100% - 60px);
    position: relative;
    top: 60px;
    background: #ffffff;
`;

export default function Layout() {
  return (
    <HTMLContainer>
      <NavContainer>
        <NavInner>
          <NavigationBar />
        </NavInner>
      </NavContainer>
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </HTMLContainer>
  );
}