import TimelineItemUI from "../presenter/TimelineItemUI";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
  };
  isQuestion?: boolean;
  isTopic?: boolean;
}

function TimelineItem({
  dateItem,
  isQuestion = false,
  isTopic,
}: TimelineTopicProps) {
  const { isCommentOn: isCommentOnGlobal } = useSelector(
    (state: RootState) => state.keyword
  );
  const [isCommentOn, setIsCommentOn] = useState(isCommentOnGlobal);

  useEffect(() => {
    setIsCommentOn(isCommentOnGlobal);
  }, [isCommentOnGlobal]);

  const toggleComment = () => {
    setIsCommentOn((prev) => !prev);
  };
  return (
    <TimelineItemUI
      dateItem={dateItem}
      isTopic={isTopic}
      isQuestion={isQuestion}
      isCommentOn={isQuestion ? false : isCommentOn}
      onCommentToggle={isQuestion ? () => {} : toggleComment}
    />
  );
}

export default TimelineItem;
