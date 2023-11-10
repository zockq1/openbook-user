import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import KeywordListUI from "../container/KeywordListUI.container";
import { KeywordModel } from "../../../../types/topicTypes";
import { useEffect, useState } from "react";

interface TopicProps {
  keywordList: KeywordModel[];
  isBookmarked: boolean;
  topicTitle: string;
}

function KeywordList({ keywordList, isBookmarked, topicTitle }: TopicProps) {
  const { isKeywordOn: isKeywordOnGlobal } = useSelector(
    (state: RootState) => state.keyword
  );
  const [isKeywordOn, setIsKeywordOn] = useState(isKeywordOnGlobal);

  useEffect(() => {
    setIsKeywordOn(isKeywordOnGlobal);
  }, [isKeywordOnGlobal]);

  const toggleKeywordList = () => {
    setIsKeywordOn((prev) => !prev);
  };

  return (
    <KeywordListUI
      isKeywordOn={isKeywordOn}
      onKeywordToggle={toggleKeywordList}
      keywordList={keywordList}
      isBookmarked={isBookmarked}
      topicTitle={topicTitle}
    />
  );
}
export default KeywordList;
