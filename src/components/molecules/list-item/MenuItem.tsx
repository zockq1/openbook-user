import styled, { ThemeContext } from "styled-components";
import { ContentState } from "../../../types/chapterTypes";
import MenuLabelBox from "../../atoms/box/MenuLabelBox";
import Icon from "../../atoms/icon/Icon";
import Text from "../../atoms/text/Text";
import { useContext } from "react";
import { FaLock } from "react-icons/fa";

interface MenuItemProps {
  title: string;
  description?: string;
  icon: string | number;
  state: ContentState;
  onClickItem: () => void;
}

interface StyledMenuItemProps {
  state: ContentState;
}

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  display: flex;
  align-items: center;
  width: auto;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};

  border: ${({ theme, state }) =>
    state === "Locked" ? theme.border.red : theme.border.black};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const MenuDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

function MenuItem({
  title,
  description,
  icon,
  state,
  onClickItem,
}: MenuItemProps) {
  const theme = useContext(ThemeContext);
  return (
    <StyledMenuItem state={state} onClick={onClickItem}>
      <MenuLabelBox state={state}>
        {typeof icon === "string" ? <Icon category={icon} /> : icon}
      </MenuLabelBox>
      <MenuDescription>
        <Text
          weight={theme.fontWeight.medium}
          size={theme.fontSizes.small}
          padding={theme.padding.xs_Lsmall}
          color={state !== "Open" ? theme.colors.red : theme.colors.black}
        >
          {title}
        </Text>
        {description && (
          <Text
            weight={theme.fontWeight.regular}
            size={theme.fontSizes.xs}
            padding={theme.padding.xs_Lsmall}
            color={state !== "Open" ? theme.colors.lightRed : theme.colors.grey}
          >
            {description}
          </Text>
        )}
      </MenuDescription>

      {state !== "Open" && <FaLock color={theme.colors.red} size={40} />}
    </StyledMenuItem>
  );
}

export default MenuItem;
