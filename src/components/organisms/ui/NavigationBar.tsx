import styled from "styled-components";
import NavigationItem from "../../molecules/list-item/NavigationItem";

const StyledNavigationBar = styled.nav`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 70px;
  width: 100%;
  border-radius: 25px 25px 0 0;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

function NavigationBar() {
  return (
    <StyledNavigationBar>
      <NavigationItem to="/" icon="home" />
      <NavigationItem
        to="/question"
        icon="questionSquare"
        aria-label="question"
      />
      <NavigationItem to="/my-info" icon="myInfo" />
      <NavigationItem to="/option" icon="setting" />
    </StyledNavigationBar>
  );
}

export default NavigationBar;
