import styled from "styled-components";
import user from "../../styles/images/user.svg";

const StyledUserBox = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 20px;
  place-items: center;
  position: relative;
  width: calc(100vw - 40px);
  height: 120px;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const UserImage = styled.img`
  height: 70px;
`;

const UserName = styled.span`
  width: 100%;
  text-align: start;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

function UserBox() {
  return (
    <StyledUserBox>
      <UserImage src={user} />
      <UserName>탁재민</UserName>
      {">"}
    </StyledUserBox>
  );
}

export default UserBox;
