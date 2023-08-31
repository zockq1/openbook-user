import styled from "styled-components";
import Icon from "../atoms/Icon";
import LoginButton from "../atoms/LoginButton";

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
  font-family: "Giants-Inline";
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding.large};
`;

function Header() {
  return (
    <StyledHeader>
      <Logo>
        정주행
        <Icon category="정주행" size={24} />
        한국사
      </Logo>
      <LoginButton />
    </StyledHeader>
  );
}

export default Header;
