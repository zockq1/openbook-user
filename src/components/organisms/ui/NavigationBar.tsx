import styled from "styled-components";
import NavigationItem from "../../molecules/list-item/NavigationItem";

const StyledNavigationBar = styled.nav`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  position: fixed;
  bottom: 0;
  height: 70px;
  width: 100vw;
  border-radius: 25px 25px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

function NavigationBar() {
  return (
    <StyledNavigationBar>
      <NavigationItem to="/" icon="home" />
      <NavigationItem
        to="/question"
        icon="fileQuestion"
        aria-label="question"
      />
      <NavigationItem to="/my-info" icon="myInfo" />
      <NavigationItem to="/option" icon="option" />
    </StyledNavigationBar>
  );
}

export default NavigationBar;
