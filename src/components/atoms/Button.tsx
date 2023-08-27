import styled from "styled-components";

const Button = styled.button`
  width: auto;
  margin: auto 15px 20px;
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.padding.base};
  border: ${({ theme }) => theme.border.black};

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

export default Button;
