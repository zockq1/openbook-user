import Skeleton from "react-loading-skeleton";
import styled, { ThemeContext } from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";

const MenuItem = styled.li`
  display: flex;
  flex-shrink: 0;
  position: relative;
  height: 78px;
  padding: 12px;
  margin: ${({ theme }) => theme.margin.base};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: 10px;
  border: ${({ theme }) => theme.border.default};
  background-color: ${({ theme }) => theme.colors.white};
  .react-loading-skeleton {
  }
`;

const MenuLabel = styled.div`
  position: absolute;
  overflow: hidden;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  padding: 1px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Title = styled.div`
  position: absolute;
  left: 82px;
  top: 16px;
`;

const Description = styled.div`
  position: absolute;
  left: 82px;
  bottom: 16px;
`;

function MenuSkeletonUI() {
  const theme = useContext(ThemeContext);
  return (
    <MenuItem>
      <MenuLabel>
        <Skeleton
          width="100%"
          height="100%"
          baseColor={theme.colors.bg}
          highlightColor={theme.colors.white}
        />
      </MenuLabel>
      <Title>
        <Skeleton
          width="100px"
          height="17.5px"
          baseColor={theme.colors.bg}
          highlightColor={theme.colors.white}
        />
      </Title>
      <Description>
        <Skeleton
          width="130px"
          height="17.5px"
          baseColor={theme.colors.bg}
          highlightColor={theme.colors.white}
        />
      </Description>
    </MenuItem>
  );
}

export default MenuSkeletonUI;
