import styled from "styled-components";

const StyledLogin = styled.a`
  position: absolute;
  top: 8px;
  right: 8px;

  padding: 5px;
  border-radius: 6px;

  font-family: "Hanna";
  font-size: 18px;
  color: #ffffff;
  background-color: #2699fb;
`;

function Login() {
  return (
    <StyledLogin
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=http://localhost:4000/oauth/kakao/login&response_type=code`}
    >
      로그인
    </StyledLogin>
  );
}

export default Login;
