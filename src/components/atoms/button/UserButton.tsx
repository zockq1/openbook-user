import { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import Icon from "../icon/Icon";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import { Link } from "react-router-dom";

const StyledUser = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Popover = styled.button`
  position: absolute;
  top: 30px;
  left: -40px;
  width: max-content;
  padding: 8px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  z-index: 99999;
`;

function UserButton() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    window.location.replace("/");
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledUser aria-label="user" ref={popoverRef}>
      <button onClick={handleClick}>
        <Icon icon={"user"} size={25} color={theme.colors.textBlue} />
      </button>
      {isVisible && (
        <Popover>
          <div onClick={handleLogout}>로그아웃</div>
          <Link to="/option">설정</Link>
        </Popover>
      )}
    </StyledUser>
  );
}

export default UserButton;
