import styled from "styled-components";
import LoginButton from "../../atoms/button/LoginButton";
import Logo from "../../atoms/icon/Logo";

const StyledHeader = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding.large};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 25px 25px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  z-index: 100;
`;

function Header() {
  return (
    <StyledHeader>
      <Logo size={24} />
      <LoginButton />
    </StyledHeader>
  );
}

export default Header;
