import styled, { ThemeContext } from "styled-components";
import { ContentState } from "../../types/chapterTypes";
import ChapterNumber from "../atoms/ChapterNumber";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import { useContext } from "react";
import { FaLock } from "react-icons/fa";

interface ListItemProps {
  title: string;
  description?: string;
  icon: string | number;
  state: ContentState;
  onClickItem: () => void;
}

interface StyledChpaterItemProps {
  state: ContentState;
}

const StyledListItem = styled.li<StyledChpaterItemProps>`
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

const ListItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

function ListItem({
  title,
  description,
  icon,
  state,
  onClickItem,
}: ListItemProps) {
  const theme = useContext(ThemeContext);
  return (
    <StyledListItem state={state} onClick={onClickItem}>
      <ChapterNumber state={state}>
        {typeof icon === "string" ? <Icon category={icon} /> : icon}
      </ChapterNumber>
      <ListItemDescription>
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
      </ListItemDescription>

      {state !== "Open" && <FaLock color={theme.colors.red} size={40} />}
    </StyledListItem>
  );
}

export default ListItem;
