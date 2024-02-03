import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ReactNode, useEffect, useState } from "react";
import BookmarkChapterUI from "../presenter/BookmarkChapterUI";

interface BookmarkChapterProps {
  chapterTitle: string;
  topicCount: number;
  children: ReactNode;
}

function BookmarkChapter({
  chapterTitle,
  children,
  topicCount,
}: BookmarkChapterProps) {
  const { isTopicOn: isTopicOnGlobal } = useSelector(
    (state: RootState) => state.keyword
  );
  const [isTopicOn, setIsTopicOnOn] = useState(isTopicOnGlobal);

  useEffect(() => {
    setIsTopicOnOn(isTopicOnGlobal);
  }, [isTopicOnGlobal]);

  const toggleTopicList = () => {
    setIsTopicOnOn((prev) => !prev);
  };

  return (
    <BookmarkChapterUI
      isTopicOn={isTopicOn}
      onTopicToggle={toggleTopicList}
      chapterTitle={chapterTitle}
      topicCount={topicCount}
    >
      {children}
    </BookmarkChapterUI>
  );
}

export default BookmarkChapter;
