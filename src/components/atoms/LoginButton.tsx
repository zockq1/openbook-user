import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";

const StyledLogin = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 24px;
  right: 12px;
  width: 40px;
  height: 40px;

  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 3px solid ${({ theme }) => theme.colors.black};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

function Login() {
  return (
    <StyledLogin
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=http://localhost:4000/oauth/kakao/login&response_type=code`}
    >
      <FiLogIn />
    </StyledLogin>
  );
}

export default Login;
