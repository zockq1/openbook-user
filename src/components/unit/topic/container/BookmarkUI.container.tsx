import styled from "styled-components";
import Icon from "../../../atoms/icon/Icon";

const Bookmark = styled.button`
  width: 100%;
  height: 100%;
`;

interface BookmarkUIProps {
  isBookmarked: boolean;
  onClickBookmark: () => void;
}

function BookmarkUI({ isBookmarked, onClickBookmark }: BookmarkUIProps) {
  return (
    <Bookmark onClick={onClickBookmark}>
      <Icon
        icon={isBookmarked ? "bookmarkOn" : "bookmarkOff"}
        size={22}
        color="black"
      />
    </Bookmark>
  );
}

export default BookmarkUI;
