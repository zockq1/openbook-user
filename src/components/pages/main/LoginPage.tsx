import styled from "styled-components";
import kakao from "../../../styles/images/kakao.png";
import { Link } from "react-router-dom";
import Logo from "../../atoms/icon/Logo";
import BackButton from "../../atoms/button/BackButton";
import usePreventScroll from "../../../hooks/usePreventScroll";

const StyledLoginPage = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  width: 100%;
  height: 100vh;
`;

function LoginPage() {
  usePreventScroll();
  return (
    <div style={{ padding: "20px" }}>
      <BackButton color="black" />
      <StyledLoginPage>
        <Logo size={40} />

        <Link
          to={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_URL}/oauth/kakao/login&response_type=code`}
          replace={true}
        >
          <img src={kakao} alt="kakao-login" />
        </Link>
      </StyledLoginPage>
    </div>
  );
}

export default LoginPage;
