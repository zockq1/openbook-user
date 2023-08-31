import styled from "styled-components";
import NavigationItem from "../molecules/NavigationItem";

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
      <NavigationItem to="/" category="Home" />
      <NavigationItem to="/question" category="Question" />
      <NavigationItem to="/my-info" category="MyInfo" />
      <NavigationItem to="/option" category="Option" />
    </StyledNavigationBar>
  );
}

export default NavigationBar;
