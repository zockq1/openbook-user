import styled, { ThemeContext } from "styled-components";
import Icon from "../../../atoms/icon/Icon";
import { useContext } from "react";

const Bookmark = styled.button`
  width: 100%;
  height: 100%;
`;

interface BookmarkUIProps {
  isBookmarked: boolean;
  onClickBookmark: () => void;
}

function BookmarkUI({ isBookmarked, onClickBookmark }: BookmarkUIProps) {
  const theme = useContext(ThemeContext);
  return (
    <Bookmark onClick={onClickBookmark}>
      <Icon
        icon={isBookmarked ? "bookmarkOn" : "bookmarkOff"}
        size={22}
        color={isBookmarked ? theme.colors.blue : theme.colors.textBlue}
      />
    </Bookmark>
  );
}

export default BookmarkUI;
