import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import KeywordListUI from "../container/KeywordListUI.container";
import { KeywordModel } from "../../../../types/topicTypes";
import { useEffect, useState } from "react";
import { ContentState } from "../../../../types/jjhTypes";

interface KeywordListProps {
  keywordList: KeywordModel[];
  isBookmarked: boolean;
  topicTitle: string;
  onClickQuestion: () => void;
  state: ContentState;
}

function KeywordList({
  keywordList,
  isBookmarked,
  topicTitle,
  onClickQuestion,
  state,
}: KeywordListProps) {
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
      onClickQuestion={onClickQuestion}
      keywordList={keywordList}
      isBookmarked={isBookmarked}
      topicTitle={topicTitle}
      state={state}
    />
  );
}
export default KeywordList;
