import styled from "styled-components";

const StyledUserBox = styled.div`
  position: relative;
  width: calc(100vw - 40px);
  height: 150px;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

function UserBox() {
  return <StyledUserBox></StyledUserBox>;
}

export default UserBox;
