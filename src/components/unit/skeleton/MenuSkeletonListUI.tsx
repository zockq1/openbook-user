import styled from "styled-components";
import MenuSkeletonUI from "./MenuSkeletonUI";

const MenuSkeletonList = styled.ul`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 65px);
  overflow: hidden;
`;

function MenuSkeletonListUI() {
  return (
    <MenuSkeletonList>
      {Array.from({ length: 10 }, (_, index) => (
        <MenuSkeletonUI key={index} />
      ))}
    </MenuSkeletonList>
  );
}

export default MenuSkeletonListUI;
