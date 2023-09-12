import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Icon from "../icon/Icon";
const StyledLogin = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <StyledLogin
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=http://localhost:4000/oauth/kakao/login&response_type=code`}
    >
      <Icon category={isLoggedIn ? "user" : "login"} size={30} />
    </StyledLogin>
  );
}

export default Login;
