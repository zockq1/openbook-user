import { useSelector } from "react-redux";
import {
  useDeleteBookmarkMutation,
  useUpdateBookmarkMutation,
} from "../../../../store/api/jjhApi";
import { RootState } from "../../../../store/store";
import BookmarkUI from "../container/BookmarkUI.container";

interface BookmarkProps {
  isBookmarked: boolean;
  topicTitle: string;
}

function Bookmark({ isBookmarked, topicTitle }: BookmarkProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [updateBookmark] = useUpdateBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const handleClickBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!isLoggedIn) return;

    if (isBookmarked) {
      deleteBookmark(topicTitle);
    } else {
      updateBookmark(topicTitle);
    }
  };

  return (
    <BookmarkUI
      isBookmarked={isBookmarked}
      onClickBookmark={handleClickBookmark}
    />
  );
}

export default Bookmark;
