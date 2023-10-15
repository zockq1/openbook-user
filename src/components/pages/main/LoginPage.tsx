import styled from "styled-components";
import kakao from "../../../styles/images/kakao.png";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../atoms/icon/Logo";
import BackButton from "../../atoms/button/BackButton";

const StyledLoginPage = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  width: 100%;
  height: 100vh;
`;

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px" }}>
      <BackButton onClick={() => navigate(-1)} />
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
