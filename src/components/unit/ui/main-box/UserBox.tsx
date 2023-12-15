import styled from "styled-components";
import user from "../../../../styles/images/user.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const StyledUserBox = styled.div`
  display: grid;
  grid-template-columns: 100px 20px 1fr 20px;
  place-items: center;
  @media (min-width: 768px) {
    grid-column: 2/4;
  }
  position: relative;
  margin: 8px;
  padding: ${({ theme }) => theme.padding.base};
  border: ${({ theme }) => theme.border.default};
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
  const id = useSelector((state: RootState) => state.auth.id);
  return (
    <StyledUserBox>
      <UserImage src={user} />
      ID:
      <UserName>{id}</UserName>
      {">"}
    </StyledUserBox>
  );
}

export default UserBox;
