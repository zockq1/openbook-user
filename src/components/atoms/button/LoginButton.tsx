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
`;

function Login() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <StyledLogin
      aria-label={isLoggedIn ? "user" : "login"}
      onClick={() => navigate(isLoggedIn ? "/option" : "/login")}
    >
      <Icon
        icon={isLoggedIn ? "user" : "login"}
        size={30}
        color={theme.colors.textBlue}
      />
    </StyledLogin>
  );
}

export default Login;
