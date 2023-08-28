import styled from "styled-components";
import { BiSolidUserCircle } from "react-icons/bi";
const StyledLogin = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  return (
    <StyledLogin
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=http://localhost:4000/oauth/kakao/login&response_type=code`}
    >
      <BiSolidUserCircle size={30} />
    </StyledLogin>
  );
}

export default Login;
