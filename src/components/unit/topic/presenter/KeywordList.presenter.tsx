import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import KeywordListUI from "../container/KeywordListUI.container";
import { KeywordModel } from "../../../../types/topicTypes";

interface TopicProps {
  keywordList: KeywordModel[];
  isBookmarked: boolean;
  topicTitle: string;
}

function KeywordList({ keywordList, isBookmarked, topicTitle }: TopicProps) {
  const isKeywordCommentOn = useSelector(
    (state: RootState) => state.keyword.isKeywordCommentOn
  );

  return (
    <KeywordListUI
      isKeywordCommentOn={isKeywordCommentOn}
      keywordList={keywordList}
      isBookmarked={isBookmarked}
      topicTitle={topicTitle}
    />
  );
}
export default KeywordList;
