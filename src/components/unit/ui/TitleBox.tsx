import styled from "styled-components";
import Icon, { IconType } from "../../atoms/icon/Icon";
import { useState } from "react";
import { Mobile } from "../../atoms/layout/Responsive";
import Logo from "../../atoms/icon/Logo";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import UserButton from "../../atoms/button/UserButton";
import LoginButton from "../../atoms/button/LoginButton";
import { Link } from "react-router-dom";

interface TitleBoxProps {
  icon: IconType | undefined | null;
  category: string;
}

const StyledTitleBox = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  left: 0;

  padding: 15px 24px;
  margin-bottom: 10px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const SlidingMenu = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 55px;
  left: 0;
  width: 250px;
  height: 100%;
  padding-top: 10px;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0);
  z-index: 9999;

  &.closed {
    transform: translateX(-100%);
  }
`;
const DarkOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 9998;
`;

const MenuItem = styled(Link)`
  display: flex;
  margin: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const TitleBox = ({ icon, category }: TitleBoxProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <Mobile>
      <StyledTitleBox>
        <button onClick={toggleMenu}>
          <Icon icon="menu" size={20} />
        </button>
        <Logo size={18} />
        {isLoggedIn ? <UserButton /> : <LoginButton />}
      </StyledTitleBox>
      <DarkOverlay visible={isMenuOpen} onClick={closeMenu} />
      <SlidingMenu className={isMenuOpen ? "" : "closed"}>
        <MenuItem to="/jeong-ju-haeng">
          <Icon icon="run" size={14} />
          &nbsp; 정주행
        </MenuItem>
        <MenuItem to="/learning">
          <Icon icon="description" size={14} />
          &nbsp; 자료
        </MenuItem>
        <MenuItem to="/timeline-list">
          <Icon icon="TIMELINE_STUDY" size={14} />
          &nbsp; 연표
        </MenuItem>
        <MenuItem to="/question/quiz-list">
          <Icon icon="question" size={14} />
          &nbsp; 퀴즈
        </MenuItem>
        <MenuItem to="/question/timeline-list">
          <Icon icon="questionSquare" size={14} />
          &nbsp; 연표 문제
        </MenuItem>
        <MenuItem to="/question/mock-exam-list">
          <Icon icon="pen" size={14} />
          &nbsp; 기출 문제
        </MenuItem>
        <MenuItem to="/my-info/wrong-notes">
          <Icon icon="fail" size={14} />
          &nbsp; 오답 노트
        </MenuItem>
        <MenuItem to="/my-info/bookmark">
          <Icon icon="bookmarkOff" size={14} />
          &nbsp; 북마크
        </MenuItem>
        <MenuItem to="/my-info/search">
          <Icon icon="search" size={14} />
          &nbsp; 검색
        </MenuItem>
        <MenuItem to="/option">
          <Icon icon="setting" size={14} />
          &nbsp; 설정
        </MenuItem>
      </SlidingMenu>
    </Mobile>
  );
};

export default TitleBox;
