import TimelineItemUI from "../container/TimelineItemUI.container";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    topicTitle: string;
    keywordList: string[] | null;
  };
  disableCircle?: boolean;
  isQuestion?: boolean;
}

function TimelineItem({
  dateItem,
  disableCircle = false,
  isQuestion = false,
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
      disableCircle={disableCircle}
      isQuestion={isQuestion}
      isCommentOn={isQuestion ? false : isCommentOn}
      onCommentToggle={isQuestion ? () => {} : toggleComment}
    />
  );
}

export default TimelineItem;
