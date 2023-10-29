import { useSelector } from "react-redux";
import { useGetTopicQuery } from "../../../../store/api/topicApi";
import { RootState } from "../../../../store/store";
import TopicUI from "../container/TopicUI.container";

interface TopicProps {
  topic: string;
}

function Topic({ topic }: TopicProps) {
  const { data: topicInfo } = useGetTopicQuery(topic);
  const isKeywordCommentOn = useSelector(
    (state: RootState) => state.keyword.isKeywordCommentOn
  );

  if (!topicInfo) {
    return <div></div>;
  }

  return (
    <TopicUI
      isKeywordCommentOn={isKeywordCommentOn}
      keywordList={topicInfo.keywordList}
    />
  );
}
export default Topic;
