import styled, { ThemeContext } from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Icon from "../icon/Icon";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
const StyledLogin = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  margin-left: auto;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

function LoginButton() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <StyledLogin
      aria-label={isLoggedIn ? "user" : "login"}
      onClick={() => navigate(isLoggedIn ? "/option" : "/login")}
    >
      {isLoggedIn ? "" : "로그인"} &nbsp;
      <Icon
        icon={isLoggedIn ? "user" : "login"}
        size={25}
        color={theme.colors.textBlue}
      />
    </StyledLogin>
  );
}

export default LoginButton;
