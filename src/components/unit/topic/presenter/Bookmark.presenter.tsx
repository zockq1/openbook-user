import {
  useDeleteBookmarkMutation,
  useUpdateBookmarkMutation,
} from "../../../../store/api/jjhApi";
import BookmarkUI from "../container/BookmarkUI.container";

interface BookmarkProps {
  isBookmarked: boolean;
  topicTitle: string;
}

function Bookmark({ isBookmarked, topicTitle }: BookmarkProps) {
  const [updateBookmark] = useUpdateBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const handleClickBookmark = () => {
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
