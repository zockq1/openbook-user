import styled, { ThemeContext } from "styled-components";
import Layout from "../atoms/Layout";
import Icon from "../atoms/Icon";
import { useContext } from "react";
import LoginButton from "../atoms/LoginButton";

const Header = styled.div`
  display: flex;
  justify-content: center;
  z-index: 100;

  width: 100%;
  height: 200px;

  padding: ${({ theme }) => theme.padding.large};
  margin-bottom: 10px;
  border-radius: 0 0 50px 50px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.blue};

  color: ${({ theme }) => theme.colors.white};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: ${({ theme }) => theme.padding.base};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.div`
  padding: ${({ theme }) => theme.padding.base};
  font-family: "Giants-Inline";
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

function Main() {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      {/* <Header /> */}
      <Header>
        <Logo>
          <Title>정주행</Title>
          <Icon category="정주행" size={24} />
          <Title>한국사</Title>
          <LoginButton></LoginButton>
        </Logo>
      </Header>
    </Layout>
  );
}

export default Main;
