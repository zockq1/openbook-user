import { useSelector } from "react-redux";
import { useGetKeywordListQuery } from "../../../../store/api/topicApi";
import { RootState } from "../../../../store/store";
import TopicUI from "../container/TopicUI.container";

interface TopicProps {
  topic: string;
}

function Topic({ topic }: TopicProps) {
  const { data: keywordList } = useGetKeywordListQuery(topic);
  const isKeywordCommentOn = useSelector(
    (state: RootState) => state.keyword.isKeywordCommentOn
  );

  if (!keywordList) {
    return <div></div>;
  }

  return (
    <TopicUI
      isKeywordCommentOn={isKeywordCommentOn}
      keywordList={keywordList}
    />
  );
}
export default Topic;
