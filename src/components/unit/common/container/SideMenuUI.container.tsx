import styled from "styled-components";
import { MenuModel } from "../../../../types/commonTypes";

interface SideMenuProps {
  menuList: MenuModel[];
  selectedId: number;
}

const MenuList = styled.ul`
  position: sticky;
  top: 100px;
  height: calc(100vh - 150px);
  width: 230px;
  min-width: 160px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.bg};

  &::-webkit-scrollbar {
    width: 18px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 100px;
    border: 7px solid ${({ theme }) => theme.colors.bg};
  }

  &::-webkit-scrollbar-track {
    background: transparent; /*스크롤바 뒷 배경 색상*/
  }
`;

const SideMenuItem = styled.li<{
  color: string;
  lock: boolean;
  isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  height: max-content;
  margin: 6px;
  padding: 10px;
  color: ${({ color }) => color};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.lightGrey : theme.colors.bg};
  box-shadow: ${({ theme, isSelected }) =>
    isSelected ? theme.shadow.defaultShadow : ""};
  transition: 0.15s ease;

  .title {
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: ${({ theme, isSelected }) =>
      isSelected ? theme.fontWeight.medium : theme.fontWeight.regular};
    margin-bottom: 4px;
  }

  .description {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    border-radius: 5px;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

    .title {
      font-weight: ${({ theme }) => theme.fontWeight.medium};
    }
  }

  cursor: pointer;
  cursor: ${({ lock }) => lock && "not-allowed"};
`;

function SideMenuUI({ menuList, selectedId }: SideMenuProps) {
  return (
    <MenuList>
      {menuList.map((menu) => {
        const {
          title,
          onClickMain,
          description,
          state,
          mainColor = "",
          icon,
          id,
        } = menu;
        return (
          <SideMenuItem
            onClick={onClickMain}
            color={mainColor}
            lock={state === "Locked"}
            isSelected={selectedId === id}
            key={id}
          >
            <div className="icon">{icon}</div>
            <div>
              <span className="title">{title}</span>
              <br />
              <span className="description">{description}</span>
            </div>
          </SideMenuItem>
        );
      })}
    </MenuList>
  );
}

export default SideMenuUI;
