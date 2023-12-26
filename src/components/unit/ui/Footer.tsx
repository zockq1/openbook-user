import styled from "styled-components";

const StyledFooter = styled.div`
  position: relative;
  width: 100%;
  height: 0px;

  background-color: ${({ theme }) => theme.colors.grey};
  z-index: 99999;
`;

function Footer() {
  return <StyledFooter></StyledFooter>;
}

export default Footer;
